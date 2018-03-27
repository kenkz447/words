# Khởi tạo một nodejs app đơn giản với express, graphql and mongodb

Làm thế nào để:
-   **Run**: `npm start`
-   **Debug**(VScode user): f5
-   **Test**: `npm test`

### TL;DR
Đây là phần mở đầu, mục tiêu là giúp các bạn có kiến thức cơ bản nhất về graphql và noSQL thông qua việc tạo một ứng dụng CRUD đơn giản.

Kịch bản của mình là tạo ra một website dưới dạng Single Page Application để học từ vựng tiếng anh, bao gồm các tính năng sau:

1. Đăng nhập / đăng ký tài khoản
2. Người dùng có thể Tạo và Lưu trữ danh sách các từ vựng cần học

Vì là SPA nên ứng dụng sẽ đc chia làm 2 phần riêng biệt. Một Server backend để thêm/sửa/xóa/đọc dữ liệu dạng CRUD. Một server để chạy front-end phục vụ client. Vì ở phần này mình sẽ tập trung vào backend nên sẽ không có giao diện web để chạy thử các tính năng, nên chủ yếu sẽ sử dụng Postman để thao tác là chính. Qua đó các bạn cũng biết được cách để tạo một API Document và cách viết test cho nó.

Cả 2 server đều chạy bằng nodejs, server backend cần cài đặt thêm mongodb. (chú ý, khi cài mongodb nên xử dụng các thông số mặc định)

Quan trọng là bạn cần có kiến thức cơ bản về javascript và nodejs trước khi theo project này.

Xem documents cụ thể trong `/documents`.