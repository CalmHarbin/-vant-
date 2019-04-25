module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/essential', '@vue/prettier'],
    // extends: ['plugin:vue/essential'],
    // extends: ['plugin:vue/essential', 'prettier'],
    // extends: ['plugin:prettier/recommended'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'comma-dangle': ['off', 'never'], //是否允许对象中出现结尾逗号
        'no-var': 'warn', //使用let和const代替var
        indent: ['off', 4], //代码缩进
        'no-mixed-spaces-and-tabs': 2, //代码缩进不能混用空格和tab。
        quotes: [2, 'single'],
        eqeqeq: 1, //必须使用全等
        'array-bracket-spacing': [2, 'never'], //指定数组的元素之间要以空格隔开(, 后面)， never参数：[ 之前和 ] 之后不能带空格，always参数：[ 之前和 ] 之后必须带空格
        // prettier-ignore
        'brace-style': [2, '1tbs', {
            allowSingleLine: true
        }], //if while function 后面的{必须与if在同一行，java风格。
        // prettier-ignore
        'comma-spacing': [2, {
            before: false,
            after: true
        }], // 控制逗号前后的空格
        'comma-style': [2, 'last'], //控制逗号在行尾出现还是在行首出现 (默认行尾)
        'eol-last': [2, 'always'], //文件末尾强制换行,always允许换行,never不允许换行
        'array-bracket-newline': [0, 'never'],
        semi: [2, 'never'] //不允许以分号结尾, never 不要分号  always要分号
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
