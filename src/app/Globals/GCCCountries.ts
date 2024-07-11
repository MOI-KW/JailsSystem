import { GCCCountry } from "../Models/rased/GccCountries";


export class GCCCountries {
    


    public static GCCList: GCCCountry[] = [
        {
            PlateCountryCode: 1,
            PlateCountryName: "KSA",
            PlateCountryNameAr: "المملكة العربية السعودية",
            ForeignPlateCategory: [
                {
                    Code: 1,
                    Type: "خاص",
                    color: "الأبيض"
                },
                {
                    Code: 2,
                    Type: "نقل عام",
                    color: "الأصفر"
                },
                {
                    Code: 3,
                    Type: "نقل خاص",
                    color: "الأزرق"
                },
                {
                    Code: 9,
                    Type: "دبلوماسي",
                    color: "الأخضر "
                },
                {
                    Code: 10,
                    Type: "خصوصي",
                    color: "بدون لون جانبي قاعدة بيضاء فقط"
                }
            ]
        },
        {
            PlateCountryCode: 3,
            PlateCountryName: "QATAR",
            PlateCountryNameAr: "قطر",
            ForeignPlateCategory: [
                {
                    Code: 1,
                    Type: "خصوصي",
                    color: "أبيض"
                },
                {
                    Code: 2,
                    Type: "نقل خاص",
                    color: "أسود"
                },
                {
                    Code: 13,
                    Type: "ليموزين",
                    color: "أبيض و رمادي"
                },
                {
                    Code: 16,
                    Type: "دراجة",
                    color: "أبيض "
                },
                {
                    Code: 17,
                    Type: "نقل عام",
                    color: "أبيض و أحمر"
                },
                 {
                    Code: 19,
                    Type: "مقطورة",
                    color: "أبيض و أخضر"
                },
                {
                    Code: 14,
                    Type: "مقطورة",
                    color: "برتقالي"
                }
            ]
        }
    ]
}


