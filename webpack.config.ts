const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (env: any) => {
    return {
        mode: env.mode ?? 'development',
        entry: path.resolve(__dirname, 'src', 'index.ts'),
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'build'),
            clean: true,
        },
        resolve: {
            extensions: ['.ts', '.js'],
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        plugins: [new ESLintPlugin({
            extensions: ['ts', 'js', 'jsx', 'tsx'],
            fix: true,
        })],
    }
};
