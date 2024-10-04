#include <stdio.h>
#include <stdbool.h>

int thayTheTrang(int a[], int n, int soKhung) {
	int khungTrang[soKhung]; // Mang luu cac trang trong bo nho
	int front = 0;     // Chi so cua trang vao dau tien
	int loiTrang = 0;  // Dem so loi trang
	bool timKiem;	   // Kiem tra xem trang co trong bo nho khong
	
	// Khoi tao tat ca cac khung trang la -1
	for(int i=0;i<soKhung;i++) {
		khungTrang[i] = -1;
	}
	
	// Duyet qua tat cac cac trang can truy cap
	for(int i=0;i<n;i++) {
		timKiem = false;
		int soTrang = a[i];
		
		// Kiem tra xem trang da co trong bo nho hay chua
		for(int j=0;j<soKhung;j++) {
			if(khungTrang[j] == soTrang) {
				timKiem = true;
				break;
			}
		}
		
		// Neu trang k co trong bo nho gay ra loi trang
		if(!timKiem) {
			khungTrang[front] = soTrang; // Thay the trang tai vi tri front
			front = (front+1)%soKhung;         // Cap nhat chi so trang vao dau tien
			loiTrang++;					 
		}
		
		// In trang thai khung trang sau khi thay the
		for(int k=0;k <soKhung;k++) {
			if(khungTrang[k] == -1) {
				printf("- ");
			} else {
				printf("%d ",khungTrang[k]);
			}
		}
		printf("\n");
	}
	return loiTrang;
}

void nhapSoTrang(int a[], int n) {
	for (int i=0;i<n;i++) {
		printf("%d ", a[i]);
	}
}

int main() {
	int n, soKhung;
	
	printf("Nhap so luong trang: ");
	scanf("%d",&n);
	
	int a[n];
	for(int i = 0;i<n;i++) {
		printf("Trang %d: ",i+1);
		scanf("%d",&a[i]);
	}
	
	printf("Nhap khung trang: ");
	scanf("%d",&soKhung);
	
	int kq = thayTheTrang(a,n,soKhung);
	printf("So loi trang: %d\n",kq);
	
	
	return 0;
}
