module.exports = {
  extends: ['./node_modules/etc-fe-eslint-config/typescript/react', 'prettier'],
  rules: {
    'react/display-name': 'off',
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/ban-ts-comment': 'off'
  }
}
