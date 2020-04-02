# app_headerline

## 处理大数字

``` js
/**
 * 配置处理后端返回数据中超出 js 安全整数范围问题
 */

import json-bigint from 'json-bigint'

request.defaults.transformResponse = [function (data) {
return data ? jsonBig.parse(data) : {} // 换了一个转化方法 使得 计算更精确 保证id不失真
}]
```

