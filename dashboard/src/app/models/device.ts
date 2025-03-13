export interface Device {
  id?: number;
  name?: string;
  type?: string;
  status?: string;
  idAccount?: number; // Người đang sử dụng thiết bị
  note?: string;
  description?: string;
  accountAssignName?: string;
}
