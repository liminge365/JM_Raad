/*
 * =====================================================================================
 *
 * @Filename    :   env.js
 * @Description :   配置编译环境和线上环境之间的切换
 *                  baseUrl: 域名地址
 * @Created     :   2018年5月4日 12:30:44
 * @Compiler    :   jdk 1.8
 * @Author      :   冯兵兵
 * @Email       :   cnrainbing@163.com
 * @Copyright   :   简媒(http://www.ejianmedia.com/)
 * @Version     :   1.0
 * =====================================================================================
 */
let baseUrl;
let routerMode;
if (process.env.NODE_ENV === 'development') {
  baseUrl = '/apis';
  routerMode = 'hash'
} else {
  baseUrl = '/apis';
  routerMode = 'hash'
}

export {
  baseUrl,
  routerMode
}
