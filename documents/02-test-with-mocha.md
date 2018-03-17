
# Implement unit test
Các bạn nên tìm hiếu về Testing và tại sao cần phải có Testing, đây là một mảng rộng và rất hàn lâm. Nhưng nói tóm tắt lại thì:

1. Đảm bảo mọi thứ dev viết ra đều chạy đúng theo kịch bản, sẽ không có bất cứ sai sót nào trước thời điểm release của sản phẩm.
2. Công đoạn refactor và maintain sẽ nhàn hơn.
3. Các test case được viết ra vô tình trở thành tài liệu sống cho sản phẩm.

Nhưng việc viết test sẽ tốn kha khá tài nguyên vì một phần phải lên kịch bản và viết ra các test case, nếu dự án yêu cầu về tiến độ thì thì không nên áp dụng. Hơn nữa, việc viết code để có thể test được cũng gây không ít phiền toái cho dev.

Hiện tại thì testing có 2 keyword có độ nổi cao là **Unit Test** và **TDD** (Test Driven Development). Unit test đơn giản là việc test theo đơn vị (bất cứ thứ gì như: class, function, object... được gọi là các đơn vị, hay unit). TDD lại là phương thức để dev viết và chạy thử một test case.

Bây giờ chúng ta đưa Unit test và cả DTT vào ứng dụng của mình. Với Unit test sẽ dùng `mocha`, một framework khá phổ biến ở thời điểm hiện tại

```bash
npm install mocha --save-dev
```

Thêm command `test` vào `scripts` trong `package.json`, command này sẽ tìm và chạy tất cả file có đuôi `.test.js` trong folder src.

```json
{
    "scripts": {
        "test": "mocha --require babel-core/register src/**/*.test.js"
    }
}
```

Lên kịch bản cho các test case đầu tiên
- File config nên export ra địa chỉ để kết nốt đến database của mongodb server
- Nên có một function để thực hiện việc kết nối đến mongodb server tên là openConnection

Tiếp tục với `chai`, cung cấp một số api cần thiết để viết các test case:
```bash
npm install chai --save-dev
```

Tạo file `src/mongoose/openConnection.test.js`

```javascript
import { expect } from 'chai'

import { mongoDbAddress } from '/config'
import { openConnection } from './openConnection'

describe('Mongoose connection', () => {
    it('Should have "mongoDbAddress" (database address) exported from configuration file', () => {
        expect(mongoDbAddress).is.not.undefined
    })
    it('Should have function to connect server named "openConnection"', () => {
        expect(openConnection).is.not.undefined
    })
})
```

Thực thi command `npm test` để xem thưởng thức kết quả. Khá dễ phải , tuy nhiên cũng có một số trường hợp không đơn giản như vậy.
Bây giờ chúng ta thực hiện kiểm tra chức năng của function kết nối đến database. Lần này sẽ áp dụng phương pháp **TDD**. Với phương pháp này, chúng ta phải xóa nội dung trong function `openConnection` để đảm bảo lần test đầu tiên sẽ fail, sau đó  viết test case như sau:

```javascript
import import mongoose from 'mongoose'
```

```javascript
it('Should open connection', function(done) {
    // openConnection sẽ trả kết quả về một Promise
    const openConnectionPromise = openConnection({ mongoDbAddress })

    // Nếu open connection thành công successCallback sẽ đc gọi,
    // việc làm ở đây là đóng connection lại và truyền function `done` vào vị trí callback để thông báo bài test này đã xong
    const successCallback = function () {
        mongoose.connection.close(done)
    }

    // Tiến hành open connection
    openConnectionPromise.then(connectionOpenedCallback)
})
```

Giờ chạy test(chắc chắn fail nhưng vẫn bắt buộc bước này). Tiếp tục implement `openConnection`:

```javascript
import mongoose from 'mongoose'

export function openConnection(options) {
    const { mongoDbAddress } = options

    const promise = new Promise((reslove, reject) => {
        mongoose.connect(mongoDbAddress)
        const db = mongoose.connection

        db.on('error', reject)
        db.once('open', reslove)
    })

    return promise
}
```

Đến bước này để thì bạn phải chạy mongodb server trước sau đó mới thực hiện test.
