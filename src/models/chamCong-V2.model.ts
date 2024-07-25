import { BasicListResponse, BasicResponse } from "./common.model";

interface ChamCongv2 {
    id: number;
    id_nhan_vien: number;
    thong_tin_nhan_vien: {
        sdb: string,
        ho_va_ten:string,
        khoi_ll:string,
        ma_bp:string,
        ten_bo_phan:string,
        id_bo_phan: number
    };
    sdb: number;
    khoi_ll: number;
    ma_bp: number;
    nctt: number;
    ca_3: number;
    nghi_phep: number;
    ro: number;
    com: number;
    om: number;
    luong_kiem_nhiem: number;
    k1: number;
    luong_gian_tiep_cong: number;
    thang_cham_cong: string;
    gio_san_pham: number;
}

interface ChamCongV2Response extends BasicResponse<ChamCongv2> {}
interface ChamCongV2ListResponse extends BasicListResponse<ChamCongv2> {}

export {ChamCongv2, ChamCongV2Response, ChamCongV2ListResponse}