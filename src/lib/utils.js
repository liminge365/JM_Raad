/**
 * Copyright (C) 2017-2030 http://www.baozinet.com/ xxx <xxxx@163.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * =====================================================================================
 *
 * @Filename    :   utils.java
 * @Description :   js 工具类库
 * @Version     :   3.0
 * @Created     :   2018年5月7日 17:55:40
 * @Compiler    :   jdk 1.8
 * @Author      :
 * @Email       :
 * @Copyright   :   简媒(http://www.ejianmedia.com/)
 * =====================================================================================
 */

export const cloneObj = function (obj) {
  let str, newObj = obj.constructor === Array ? [] : {};
  if (typeof obj !== 'object') {
    return;
  } else if (window.JSON) {
    str = JSON.stringify(obj); //序列化对象
    newObj = JSON.parse(str); //还原
  } else {
    for (let i in obj) {
      newObj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i];
    }
  }
  return newObj;
};
