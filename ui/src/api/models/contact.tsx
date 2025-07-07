export interface ContactReq {
  name: string;
  email: string;
  phone?: string;
  address?: string;
}
export interface ContactRes extends ContactReq {
  id: string;
}
