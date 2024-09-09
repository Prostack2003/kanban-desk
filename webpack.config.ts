import path from 'path';
import ESLintPlugin from 'eslint-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack';

export default (env: any) => {
    const config: webpack.Configuration = {
        mode: env.mode ?? 'development',
        entry: path.resolve(__dirname, 'src', 'index.ts'),
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'build'),
            clean: true,
        },
        resolve: {
            extensions: ['.tsx','.ts', '.js'],
        },
        module: {
            rules: [
                {
                    test: /\.tsx$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        plugins: [
            new ESLintPlugin({
                extensions: ['ts', 'js', 'jsx', 'tsx'],
                fix: true,
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src', 'index.html'),
            })],
    }
    return config
};
