import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DeviceService} from '../../../services/device.service';
import {Device} from '../../../models/device';
import {CategoryService} from '../../../services/category.service';
import {Category} from '../../../models/category';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.css']
})
export class DeviceFormComponent implements OnInit {

  deviceForm!: FormGroup;
  deviceId?: number; // Dùng để kiểm tra xem đang sửa hay thêm mới
  categorys?: Category[];

  constructor(
    private fb: FormBuilder,
    private deviceService: DeviceService,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
  ) {
    this.categoryService.getAll().subscribe(
      (response: Category[]) => {
        this.categorys = response;
        console.log('response: ' + response);
      },
      (err: HttpErrorResponse) => {
        console.log('có lỗi: ', err);
      }
    );
  }

  ngOnInit(): void {
    // Khởi tạo Form
    this.deviceForm = this.fb.group({
        name: ['', [Validators.required, Validators.pattern(/^\S+$/)]],
        categoryId: ['', Validators.required],
        note: [''],
        description: ['']
      }
    );

    // Kiểm tra nếu có ID trong URL -> Chỉnh sửa thiết bị
    this.deviceId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.deviceId) {
      this.deviceService.getDeviceById(this.deviceId).subscribe((device: Device) => {
        this.deviceForm.patchValue(device);
      });
    }
  }

  onSubmit() {
    if (this.deviceForm.valid) {
      const deviceData: Device = this.deviceForm.value;

      if (this.deviceId) {
        // Gửi API cập nhật thiết bị
        this.deviceService.updateDevice(this.deviceId, deviceData).subscribe(() => {
          alert('Thiết bị đã được cập nhật thành công!');
          this.router.navigate(['/devices']); // Chuyển hướng sau khi lưu
        });
      } else {
        // Gửi API thêm mới thiết bị
        this.deviceService.addDevice(deviceData).subscribe(() => {
          alert('Thiết bị đã được thêm thành công!');
          this.router.navigate(['/devices']);
        });
      }
    }
    console.log(this.deviceForm.value);
  }

  onCancel() {
    this.router.navigate(['/devices']);
  }

}
