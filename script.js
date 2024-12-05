function runFIFO() {
    // Lấy dữ liệu từ các ô input
    const pagesInput = document.getElementById('pages').value;
    const framesInput = document.getElementById('frames').value;

    // Kiểm tra tính hợp lệ của đầu vào
    if (!pagesInput || !framesInput || isNaN(framesInput)) {
        alert("Vui lòng nhập đầy đủ dữ liệu hợp lệ!");
        return;
    }

    const pages = pagesInput.split(',').map(Number);
    const numFrames = parseInt(framesInput);
    if (numFrames <= 0) {
        alert("Số khung phải lớn hơn 0!");
        return;
    }

    const frames = []; // Danh sách khung trang
    let pageFaults = 0; // Đếm lỗi trang
    let output = `
        <style>
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
            th { background-color: #f4f4f4; }
        </style>
        <table>
            <tr>
                <th>Step</th>
                <th>Page</th>
                <th>Frames</th>
                <th>Page Fault</th>
            </tr>`;

    // Duyệt qua từng trang
    pages.forEach((page, index) => {
        let pageFault = false;

        // Kiểm tra xem trang đã có trong khung chưa
        if (!frames.includes(page)) {
            pageFault = true; // Đánh dấu là lỗi trang
            pageFaults++;

            if (frames.length < numFrames) {
                // Nếu khung chưa đầy, thêm trang mới
                frames.push(page);
            } else {
                // Nếu khung đã đầy, loại bỏ trang đầu tiên (FIFO)
                frames.shift();
                frames.push(page);
            }
        }

        // Cập nhật bảng kết quả
        output += `
            <tr>
                <td>${index + 1}</td>
                <td>${page}</td>
                <td>${frames.join(', ') || "Empty"}</td>
                <td>${pageFault ? "Yes" : "No"}</td>
            </tr>`;
    });

    // Tổng kết và hiển thị kết quả
    output += `</table><p><strong>Total Page Faults:</strong> ${pageFaults}</p>`;
    document.getElementById('output').innerHTML = output;
}
