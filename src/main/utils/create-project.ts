import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { CreateProjectRequest } from '../../shared/types/ipc'

const createFolder = (fullPath: string): { success: boolean; path: string } => {
  try {
    if (!existsSync(fullPath)) {
      mkdirSync(fullPath)

      return { success: true, path: fullPath }
    }
  } catch (err) {
    console.error(err)
    return { success: false, path: fullPath }
  }

  return { success: false, path: fullPath }
}

const createPackageConfig = (path: string, title: string): { success: boolean } => {
  try {
    writeFileSync(
      `${path}/package.json`,
      JSON.stringify({
        name: title,
        version: '0.0.1',
        description: 'your documentation made sensacionante',
        main: 'index.js',
        scripts: {
          dev: 'rspress dev',
          build: 'rspress build',
          preview: 'rspress preview'
        },
        devDependencies: {
          rspress: '^1.31.0',
          typescript: '^5.6.2',
          'ts-node': '^10.9.2'
        },
        keywords: ['documentation', 'rspress'],
        author: 'you',
        license: 'ISC'
      })
    )

    return { success: true }
  } catch (error) {
    return { success: false }
  }
}

const createTsConfig = (path: string): { success: boolean } => {
  try {
    writeFileSync(
      `${path}/tsconfig.json`,
      JSON.stringify({
        compilerOptions: {
          target: 'ES2020',
          lib: ['DOM', 'ES2020'],
          module: 'ESNext',
          jsx: 'react-jsx',
          noEmit: true,
          strict: true,
          skipLibCheck: true,
          isolatedModules: true,
          resolveJsonModule: true,
          moduleResolution: 'bundler',
          useDefineForClassFields: true,
          allowImportingTsExtensions: true
        },
        include: ['docs', 'theme', 'rspress.config.ts'],
        mdx: {
          checkMdx: true
        }
      })
    )
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}

const createRsConfig = (path: string): { success: boolean } => {
  try {
    writeFileSync(
      `${path}/rspress.config.ts`,
      ` import { defineConfig } from 'rspress/config';
        export default defineConfig({
          root: 'docs',
        });
      `
    )

    return { success: true }
  } catch (error) {
    return { success: false }
  }
}

const createHelloFile = (path: string): { success: boolean } => {
  try {
    writeFileSync(`${path}/index.md`, ` # Hello World `)

    return { success: true }
  } catch (error) {
    return { success: false }
  }
}

export const configRspress = async ({
  path,
  title
}: CreateProjectRequest): Promise<{ success: boolean; path: string }> => {
  const fullPath = `${path}/${title}`

  const { success } = await createFolder(fullPath)

  if (success) {
    createPackageConfig(fullPath, title)
    createRsConfig(fullPath)
    createTsConfig(fullPath)
    const { success, path } = createFolder(`${fullPath}/docs`)
    if (success) {
      createHelloFile(path)

      return { success: true, path: fullPath }
    }

    return { success: false, path: fullPath }
  }

  return { success: false, path: fullPath }
}
