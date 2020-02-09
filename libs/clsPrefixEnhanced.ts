
export default class clsPrefixHandler {
  clsPrefix: string;

  constructor(clsPrefix: string) {
    this.clsPrefix = clsPrefix;
  }

  err = (str: string) => {throw new Error(str)}

  objectHandler = (strs: any) => {

    const clsList = Object.keys(strs);

    if (!clsList.length) {
      this.err('Type Object expect at least 1 value');
    }

    let enhancedCls:string = '';
    clsList.forEach((key, i) => {

      const judgedCls = strs[key] ? key : '';

      if (!judgedCls) return;

      const spacing = enhancedCls ? ' ' : '';

      if (this.clsPrefix) {
        enhancedCls += `${spacing}${this.clsPrefix}-${judgedCls}`
      } else {
        enhancedCls += `${spacing}${judgedCls}`
      }
    })

    return enhancedCls;
  }

  arrayHandler = (strs: string[]) => {

    // 禁止使用空数组
    if (strs.length === 0 || !strs.find(Boolean)) {
      this.err('Type Array expect at least 1 `true` value');
    }

    // 禁止数组的值禁止使用非字符串类型
    if (strs.some(el => typeof el !== 'string')) {
      this.err('Type Array value only expect string');
    }

    // 禁止数组的值存在两个及以上的空字符串
    if (strs.filter(el => !el).length >= 2) {
      this.err('Type Array only can set 1 empty string');
    }

    if (strs.length === 1) {
      return this.clsPrefix ? `${this.clsPrefix}-${strs[0]}` : strs[0];
    }

    return strs.reduce(
        (current: string, next: string, i: number) => {

          if (!this.clsPrefix) return `${current} ${next}`;

          const index_0: string = i === 0 ? `${this.clsPrefix}-` : '';

          if (!current) return `${this.clsPrefix} ${this.clsPrefix}-${next}`;

          if (!next) return `${index_0}${current} ${this.clsPrefix}`;

          return `${index_0}${current} ${this.clsPrefix}-${next}`;
    })
  }

  stringHandler = (str: string) => {

    if (!this.clsPrefix) return str;

    return str ? `${this.clsPrefix}-${str}` : this.clsPrefix;
  }

  // 拼接 class， 这里面只做 args 的数量判断
  splice = (...args: any[]) => {

    if (args.length > 1) {
      return args.reduce((cur?: any, next?: any) =>
        `${this.typeJudgeHandler(cur)} ${this.typeJudgeHandler(next)}`)
    }

    if (args.length === 1) {
      return this.typeJudgeHandler(args[0]);
    }

    if (args.length === 0) {
      return this.clsPrefix;
    }
  };

  // 类型判断
  typeJudgeHandler = (data: any) => {

    if (typeof data === 'string' || !data) {
      return this.stringHandler(data ? data : '')
    }

    if (data instanceof Array) {
      return this.arrayHandler(data)
    }

    if (Object.prototype.toString.call(data) === '[object Object]') {
      return this.objectHandler(data)
    }

    this.err('Type error, expect string|Array|Object|undefined');
  }
}
