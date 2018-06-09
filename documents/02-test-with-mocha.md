
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

import { mongoDbAddress } from '@/config'
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
Bây giờ chúng ta thực hiện kiểm tra chức năng của function kết nối đến database. Lần này sẽ áp dụng phương pháp **TDD**(Cụ thể là việc code phải đáp ứng hai tiêu chí: Test-First (Kiểm thử trước) và Refactoring (Điều chỉnh mã nguồn)). 
Vì vậy khi ap dụng với phương pháp này, chúng ta phải xóa nội dung trong function `openConnection` (để đảm bảo lần test đầu tiên sẽ fail). Rồi code tiếp test case như sau:

```javascript
import import mongoose from 'mongoose'
```

```javascript
it('Should open connection', function(done) {
    // openConnection sẽ trả kết quả về một Promise
    const openConnectionPromise = openConnection({ mongoDbAddress })

    // Nếu open connection thành công successCallback sẽ đc gọi,
    // việc làm ở đây là đóng connection lại và đưa function `done` vào vị trí callback để thông báo bài test này đã xong
    const successCallback = function () {
        mongoose.connection.close(done)
    }

    // Tiến hành open connection
    openConnectionPromise.then(connectionOpenedCallback).catch((error) => {
        done(error)
    })
})
```

Giờ chạy test(chắc chắn fail nhưng vẫn bắt buộc thực hiện). Sau đó implement `openConnection`:

```javascript
import mongoose from 'mongoose'

export function openConnection(options) {
    const { mongoDbAddress } = options

    const promise = new Promise((resolve, reject) => {
        mongoose.connect(mongoDbAddress)
        const db = mongoose.connection

        db.on('error', reject)
        db.once('open', resolve)
    })

    return promise
}
```

Kết nối đến db là bất đồng bộ, nên để biết được lúc nào quá trình hoàn tất chúng ta bắt buộc phải sử dụng các hàm callback để nhận diện. Và hiệu quả và tối ưu nhất là sử dụng Promise, `resolve` sẽ được gọi nếu kết nối thành công, `reject` dành cho trường hợp còn lại. Hai function này được định nghĩa bên trong test case. Xem lại bài test cần lưu ý về `done`, đây là function dùng trong trường hợp kiểm thử bất đồng bộ, nếu gọi `done()` thì test đã pass, còn `done(error)` đồng nghĩa test fail và `error` là lỗi dưới dạng string.
Thời gian đợi (timeout) từ khi bắt đầu chạy testcase đến lúc `done()` là 2000ms, lâu hơn 2000ms đồng nghĩa test thất bại. Chúng ta có thể thay đổi timeout mặc định bằng cách thêm `--timeout` vào `test` script.
Để test function này thì phải chạy mongodb server trước.
