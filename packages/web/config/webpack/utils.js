const isEnvProduction = process.env.NODE_ENV === 'production';

const filename = (ext) =>
    !isEnvProduction ? `[name].${ext}` : `[name].[contenthash].${ext}`;

module.exports = {isEnvProduction, filename}