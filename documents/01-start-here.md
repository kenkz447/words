
## Khởi tạo project

Tạo folder mới tên `words` và di chuyển đến folder vừa tạo. Sử dụng cli với cú pháp:
```bash
npm init
```
Sau đó nhập các thông tin cơ bản về project. Hoặc đơn giản hơn, dùng `npm init -y` để sử dụng các thông số mặc định. 
Đây là file `package.json` vừa được tạo ra :

````json
{
  "name": "words",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
````

Có 2 thứ cần được chú ý ở đây:

**scripts**

````json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
}
````
`scripts` là một nơi để bạn khai báo các command được project sử dụng cho các công việc build/test/deloy/commit ...etc.
Công dụng chủ yếu của phần này là rút ngắn các câu lệnh để dễ nhớ và dễ chạy.


Cụ thể ở đây, `test` là một alias cho `echo \"Error: no test specified\" && exit 1`. 
Nếu bạn gõ `npm test` vào terminal sẽ in ra:
````
...
"Error: no test specified"
npm ERR! Test failed.  See above for more details.
````

Giải thích thêm cho các bạn ít biết về bash command trên linux: `echo \"Error: no test specified\" && exit 1` thực chất là 2 lệnh chạy đồng bộ.
`echo "Error: no test specified"` để in ra thông báo lỗi *Error: no test specified*
và `exit 1` để thoát khỏi bash job hiện tại. 2 lệnh được nối với nhau bằng `&&`.

**main**

````json
"main": "index.js"
````

Bạn cần bạn cần tạo file khỏi chạy cho app trong môi trường production, mặc định ở là `index.js`:

````javascript
const http = require('http')

const server = http.createServer(function(request, response) {
    // Send the response body as "Hello World"
    response.end('Hello World!')
})

// Using port 3000
server.listen(3000)

// Console will print the message
console.log('Server running at http://127.0.0.1:3000/')
````

Cuối cùng là chạy: `node index.js`. Nhập url http://127.0.0.1:3000 vào trình duyệt và xem server trả về đoạn text "Hello World!".
Đoạn code trên khá đơn giản, chắc mình sẽ không giải thích thêm.

## Cài đặt Express

Ở phần trên bạn đã tạo được một server nodejs, trả về phía client **Hello World** khi nhận được request. 
Việc viết nodejs chay như vậy sẽ khá vất vả và ít khi thấy trong các project thực tế. Vậy nên chúng ta sẽ sử dụng một framework
để hỗ trợ cho việc code nhanh là tiện hơn. Mình chọn `express` theo số đông.

````sh
npm install express
````

Để ý trong project hiện tại sẽ xuất thêm 1 file lạ là `package-lock.json`, file này được npm xử dụng để cố định phiên bản của các module (theo lý thuyết thì việc này giúp làm tăng tính ổn định của app, thực tế thì chưa thấy hiệu quả lắm).

Thay đổi nội dung file `index.js`

````javascript
const express = require('express')
const app = express()

app.get('/', function(request, response) { 
    res.send('Hello World!')
})

app.listen(3000, function() {
    console.log('Server running at http://127.0.0.1:3000/')
})
````

## Kết nối đến mongodb

Tạo file `config.js` để lưu các cài đặt của app, trước tiên là địa chỉ của máy chủ mongodb:

````javascript
const mongoDbServer = 'mongodb://localhost:27017/'
const databaseName = 'works'
// mongodb://localhost:27017/works
const mongoDbAddress = `${mongoDbServer}${databaseName}`

module.exports= {
    mongoDbAddress
} 
````

Cài đặt module **mongoose**
```sh
npm install mongoose
```
và tạo file theo đường dẫn `src/mongoose/openConnection.js`

````javascript
import mongoose from 'mongoose'

export function openConnection(options) {
    const { mongoDbAddress } = options

    mongoose.connect(mongoDbAddress)
    const db = mongoose.connection

    db.on('error', () => {
        console.error('ERROR: Failed to connect to mongoose.')
    })

    db.once('open', () => {
        console.log('DONE: Connected to mongoose.')
    })
}
````

và `src/mongoose/index.js`

```javascript
export * from './openConnection'
```

Sử dụng file `index.js` mục đích quản lý các export từ trong folder, việc import module sau này cũng đơn giản hơn. Ví dụ:

```javascript
// Có thể dùng
import { openConnection } from 'src/mongoose'
// Thay vì
import { openConnection } from 'src/mongoose/openConnection'
```

Lưu ý, `import` và `export` là cú pháp của es6, vì vậy sẽ gây lỗi nếu không biên dịch thành `commonJS`(nodejs bắt buộc như vậy). Cho dễ hiểu:

```javascript
// CommonJS, ok
module.exports.openConnection = function openConnection(options) {
// logic here...
}

// Es6 Module, not ok
export function openConnection(options) {
// logic here...
}
```

Nên một số bộ biên dịch javascript-to-javascript như `babel` ra đời. Bây giờ thì chúng ta bắt buộc phải cài đặt `babel`

```
npm install babel babel-cli --save-dev
```

`--save-dev` là một command argument để lưu `babel babel-cli` vào devDependencies trong `package.json`. `devDependencies` là các module phục vụ cho việc code, biên dịch hay công việc linh tinh khác chứ không phải dùng trong quá trình sử dụng app.

Sau khi các gói được cài đặt xong, chúng ta sẽ thêm một command để chạy app bằng babel, chỉnh sửa `package.json`:

```json
{
    "scripts" : {
        "start": "babel-node index.js"
    }
}
```

Từ đây trở về sau, ta dùng command `npm start` thay thế cho `node app.js`.

Trở lại file `index.js`, chúng ta import các phần đã viết ở trước

```javascript
import { openConnection } from '/src/mongoose'
import { mongoDbAddress } from '/config'

openConnection({ mongoDbAddress })
```

`/src/mongoose` và `/config` là kiểu đường dẫn chúng ta tự setup cho babel. Việc setup như vậy giúp việc import dễ dàng và code trông đẹp hơn. Như:

```javascript
// Khi src là folder ở root của project, foo và bar nằm trong src
// File hiện tại '/scr/bar/sub01/sub02/sub03/sub04/bar.js'
// Thay vì:
import module from '../../../../foo'

// Ta dùng: 
import module from 'src/foo'
```

Để làm việc này, trước tiên cài đặt package `babel-plugin-module-resolver`:

```bash
npm install module-resolver --save-dev
```

Và tạo file config `.babelrc` đặt ở root của project:

```json
{
    "plugins": [
        ["module-resolver", {
            "root": ["./"]
        }]
    ]
}
```
Tạm thời vậy là hoàn tất bước config cơ bản cho babel. Việc tiếp theo là khởi chạy app với express, thêm nội dung vào file `index.js`:

```javascript
import express from 'express'

const app = express()

app.listen(3000, () => {
    console.log("INFO: Express server is running!")
})
```

Chạy mongodb server trước khi gọi `npm start`. Nếu mọi thứ ok thì dưới console sẽ in ra:
```
INFO: Express server is running!
DONE: Connected to mongoose.
```