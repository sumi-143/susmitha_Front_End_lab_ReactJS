module.exports = 
{
  test: /\.tsx?$/,
  exclude: /node_modules/,
  loader: 'ts-loader',
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  }

}
  