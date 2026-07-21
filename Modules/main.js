define(["esri/layers/FeatureLayer", "esri/geometry/Polygon", "esri/identity/IdentityManager", "esri/Graphic", "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol", "esri/geometry/Multipoint"],
    function (FeatureLayer, Polygon, IdentityManager, Graphic, SimpleFillSymbol, SimpleLineSymbol, Multipoint) {

        const ARCGIS_STORAGE_KEY_URL = "mot.arcgis.online.url";

        function normalizeArcGisBase(raw) {
            const val = String(raw || "").trim().replace(/\/+$/, "").replace(/\/query$/i, "");
            if (!val) return "";
            if (/\/(FeatureServer|MapServer)\/\d+$/i.test(val)) {
                return val.replace(/\/\d+$/i, "");
            }
            if (/\/(FeatureServer|MapServer)$/i.test(val)) {
                return val;
            }
            return "";
        }

        function getConfiguredArcGisBase() {
            try {
                const fromStorage = normalizeArcGisBase(localStorage.getItem(ARCGIS_STORAGE_KEY_URL));
                if (fromStorage) return fromStorage;
            } catch (_) {
                // Ignore storage access errors.
            }
            return "";
        }

        function getArcGisLayerUrl(layerId) {
            const base = getConfiguredArcGisBase();
            if (!base) {
                throw new Error("ArcGIS URL is not configured. Save it in arcgis_settings.html first.");
            }
            return base + "/" + layerId;
        }

        return {

            // Initiat_AccidenPointss: async function () {
            //     return await InitiatFeatureLayer("Mos_assetes", 0,"مواقع الاصول");
            // },
            Initiat_Accident_Points: async function () {
                var AccidenPoints = new FeatureLayer({
                    url: getArcGisLayerUrl(0),
                    mode: FeatureLayer.MODE_ONDEMAND, // فقط البيانات في Extent الحالي
                    outFields: ["*"], // Fetch all
                });
                    AccidenPoints.popupTemplate = {
                        title: "{ReportNumber}",  // Title field from the feature attributes
                        fieldInfos: [
                            { fieldName: "ReportNumber", label: "رقم التقرير" },
                            { fieldName: "ContractNumber", label: "رقم العقد" },
                            { fieldName: "RegionName", label: "اسم المنطقة" },
                            { fieldName: "AccidentDate", label: "تاريخ الحادث" },
                            { fieldName: "RoadNumber", label: "رقم الطريق" },
                            { fieldName: "HighwayDirectionAr", label: "اتجاه الطريق" },
                            { fieldName: "Longitude", label: "خط الطول" },
                            { fieldName: "Latitude", label: "خط العرض" },
                            { fieldName: "AccidentTypeAr", label: "نوع الحادث" },
                            { fieldName: "Accidantcatogry", label: "تصنيف الحادث" },
                            { fieldName: "ImpactType", label: "نوع التصادم" },
                            { fieldName: "PrimaryAccidantCause", label: "السبب الرئيسي للحادث" },
                            { fieldName: "AccidantCause", label: "سبب الحادث" },
                            { fieldName: "DeadNumber", label: "عدد الوفيات" },
                            { fieldName: "InjuriesNumber", label: "عدد الإصابات" },
                            { fieldName: "DamagesNumber", label: "عدد الأضرار" },
                            { fieldName: "Costaccident", label: "تكلفة الحادث" },
                            { fieldName: "VehiclesNumber", label: "عدد المركبات" },
                            { fieldName: "VehicleType", label: "نوع المركبة" },
                            { fieldName: "GeomatricRoadType", label: "الوضع الهندسي للطريق" },
                            { fieldName: "IntersectionType", label: "نوع التقاطع" },
                            { fieldName: "ShoulderWidhtdriver", label: "عرض الكتف جهة السائق" },
                            { fieldName: "ShoulderWidhtPassenger", label: "عرض الكتف جهة الراكب" },
                            { fieldName: "Trafficvolume", label: "مستوى حركة المرور" },
                            { fieldName: "UrbanRuralType", label: "نوع المنطقة (حضري/ريفي)" },
                            { fieldName: "educationalArea", label: "منطقة تعليمية" },
                            { fieldName: "EngineeringRecommendation", label: "التوصيات الهندسية / ملاحظات الرصد" },
                            { fieldName: "WebsiteImage", label: "صورة الموقع" },
                            { fieldName: "AffectedEntity", label: "الجهة التابعة" },
                            { fieldName: "IsDeadly", label: "هل توجد وفيات؟" },
                            { fieldName: "IsInjury", label: "هل توجد إصابة؟" },
                            { fieldName: "IsDamage", label: "هل هناك تلف؟" },
                            { fieldName: "SharingTrucks", label: "مشاركة الشاحنات" },
                            { fieldName: "MachineryType", label: "نوع المركبة (آلية)" },
                            { fieldName: "MoreVehicle", label: "أكثر من مركبة" },
                            { fieldName: "ConditionStutues", label: "حالة الدهانات" },
                            { fieldName: "Landusdriverside", label: "استخدام الأرض - جانب السائق" },
                            { fieldName: "Landusepassengerside", label: "استخدام الأرض - جانب الراكب" },
                            { fieldName: "IsLighting", label: "وجود إنارة" },
                            { fieldName: "WeatherStatus", label: "حالة الطقس" },
                            { fieldName: "InsidDetour", label: "داخل تحويلة؟" },
                            { fieldName: "FirstPartyVehicleType", label: "نوع مركبة الطرف الأول" },
                            { fieldName: "SecondPartyVehicleType2", label: "نوع مركبة الطرف الثاني" },
                            { fieldName: "KsaRap", label: "التقييم النجمي" },
                            { fieldName: "Curvature", label: "الانحنائية" }
                        ]
                        ,
                        content: [
                            {
                                type: "media",
                                mediaInfos: [{
                                    type: "image", // Specify this is an image
                                    value: {
                                        // sourceURL: `/api/Proxy/GetImage?parcelId={Parcel_ID}&imageId=1`
                                        sourceURL: `https://mohamed991-001-site1.itempurl.com/api/Proxy/GetImageFromLink?url={WebsiteImage}`
                                    },
                                    caption: "صور الحادث"
                                }]
                            }
                            ,
                            //{
                            //    type: "text", // <-- this allows raw HTML
                            //    text: `<a  href="href="javascript:openParcelModal('{Parcel_ID}')" target="_blank" >عرض الصور</a>`
                            //}
                            //,
                            {
                                type: "fields"

                            }]
                    //     ,
                    //     actions: [
                    //         {
                    //             id: "print",
                    //             title: "بطاقة الموقع",
                    //             className: "esri-icon-printer"
                    //         },
                    //         {
                    //             title: "ثلاثية الابعاد",
                    //             id: "3d",
                    //             className: "esri-icon-line-of-sight"
                    //         },
                    //         {
                    //             title: "مشاركة",
                    //             id: "share",
                    //             className: "esri-icon-share" // Predefined Esri icon class
                    //         }
                    //     ]
                  }
                return AccidenPoints;
            },
            Initiat_AdministrationBoarder: async function () {
                var Areas = new FeatureLayer({
                    url: getArcGisLayerUrl(2),
                    mode: FeatureLayer.MODE_ONDEMAND, // فقط البيانات في Extent الحالي
                    outFields: ["*"], // Fetch all
                });
                return Areas;
            },
            Initiat_Roads: async function () {
                var Roads = new FeatureLayer({
                    url: getArcGisLayerUrl(1),
                    mode: FeatureLayer.MODE_ONDEMAND, // فقط البيانات في Extent الحالي
                    outFields: ["*"], // Fetch all
                });
                Roads.popupTemplate = {
                    title: "{ReportNumber}",  // Title field from the feature attributes
                    fieldInfos: [
                        { fieldName: "RoadNo", label: "رقم الطريق" },
                        { fieldName: "NameAr", label: "اسم الطريق" },
                        { fieldName: "HighwayDirectionAr", label: "اتجاه الطريق" },
                        { fieldName: "RoadEngineeringTypeAr", label: "التصنيف الهندسي" },
                        { fieldName: "OwnershipAr", label: "ملكية الطريق" },
                        { fieldName: "RoadStatusAr", label: "حالة الطريق" },
                        {
                            fieldName: "GeometryLength", label: "الطول الهندسي",
                            format: {
                                places: 2, // عدد الأرقام العشرية (مثلاً 2)
                                digitSeparator: true // إضافة فاصلة الآلاف
                            }

                        },
                        { fieldName: "PBCNO", label: "رقم عقد الاداء" }


                    ]
                    ,
                    content: [
                        {
                            type: "fields"

                        }]
                
                }

                return Roads;
            },
            HideIsraeal: function (view) {
                const israelPolygon = new Polygon({
                    rings: [
                        [
                            [34.228521, 31.325918],
                            [34.917866, 29.489882],
                            [35.525998, 31.79781],
                            [34.758721, 32.057666],
                            [34.228521, 31.325918] // العودة للنقطة الأولى
                        ]
                    ],

                    spatialReference: { wkid: 4326 } // استخدام إحداثيات WGS84
                });
                // تحديد مظهر المستطيل (تغطية جزئية على الخريطة)
                const rectangleSymbol = new SimpleFillSymbol({
                    color: [250, 223, 170, 255], // اللون الأبيض مع الشفافية
                    outline: new SimpleLineSymbol({
                        color: [250, 223, 170, 255], // إخفاء الحدود
                        width: 0
                    })
                });

                // إنشاء Graphic للمستطيل
                const rectangleGraphic = new Graphic({
                    geometry: israelPolygon,
                    symbol: rectangleSymbol
                });

                // إضافة المستطيل إلى الخريطة
                view.graphics.add(rectangleGraphic);
            },
            ZoomToRegion: function (Region_graphicsLayer, view, AdministrationBorder, RegionDropdownValue) {


                let query = AdministrationBorder.createQuery();
                query.where = "Code='" + RegionDropdownValue + "'";
                query.returnGeometry = true;
                AdministrationBorder.queryFeatures(query)
                    .then(function (response) {
                        view.goTo({
                            target: response.features[0].geometry,

                        }).catch((error) => {

                            view.goTo({
                                target: response.features[0].geometry

                            })
                        });

                        const fillSymbol = new SimpleFillSymbol({
                            color: null,  // RGBA color
                            outline: {                   // Outline symbol
                                color: [255, 0, 0],
                                width: 2
                            }
                        });

                        // Create a graphic and add it to the view
                        const polygonGraphic = new Graphic({
                            geometry: response.features[0].geometry,
                            symbol: fillSymbol
                        });
                        if (Region_graphicsLayer != null) {
                            Region_graphicsLayer.removeAll();
                            Region_graphicsLayer.add(polygonGraphic);
                        }

                    });
            },
            GoToClubByID: function (Parcel_ID, Lands_polygon, view) {
                let query = Lands_polygon.createQuery();
                query.where = "Parcel_ID=" + Parcel_ID;
                query.returnGeometry = true;
                Lands_polygon.queryFeatures(query)
                    .then(function (response) {
                        view.goTo({
                            target: response.features[0].geometry,
                            heading: 0,
                            tilt: 45
                        }, {
                            animate: true
                        }).catch((error) => {
                            view.goTo({
                                target: response.features[0].geometry,
                                heading: 0,
                                tilt: 45
                            }, {
                                animate: true
                            })

                        });
                        view.popup.open({
                            features: [response.features[0]],
                            location: response.features[0].geometry
                        });
                    });

            },
            GoToClubByName: function (Parcel_Name, Lands_polygon, view) {
                let query = Lands_polygon.createQuery();
                query.where = "Parcel_Name=N'" + Parcel_Name + "'";
                query.returnGeometry = true;
                Lands_polygon.queryFeatures(query)
                    .then(function (response) {
                        view.goTo({
                            target: response.features[0].geometry,
                            heading: 0,
                            tilt: 45
                        }, {
                            animate: true
                        });
                        view.popup.open({
                            features: [response.features[0]],
                            location: response.features[0].geometry
                        });
                    });
            },
            GetBranchMap: function (Branch, AccidenPointss, Lands_polygon, view) {
                AccidenPointss.definitionExpression = "Branch_Name =" + Branch;
                Lands_polygon.definitionExpression = "Branch_Name =" + Branch;



                AccidenPointss.when(() => {
                    AccidenPointss.queryFeatures({
                        where: AccidenPointss.definitionExpression,
                        returnGeometry: true,
                    }).then((result) => {
                        const features = result.features;

                        if (features.length > 0) {
                            // If only one point, zoom directly to it
                            if (features.length === 1) {
                                view.goTo({
                                    target: features[0].geometry,
                                    zoom: 15
                                });
                            } else {
                                // Build an extent that includes all points
                                const multipoint = new Multipoint({
                                    points: features.map(f => [f.geometry.x, f.geometry.y]),
                                });

                                // Get extent of all points and zoom to it
                                // const extent = multipoint.extent.expand(1.5); // Add some padding
                                view.extent = multipoint.extent.expand(4);
                            }
                        } else {
                            console.warn("No features matched the query.");
                        }
                    });
                });
            },
            OpenParcelPopup: function (SelectedParcelpoint_graphicsLayer, pointResult, Lands_polygon, view) {
                SelectedParcelpoint_graphicsLayer.removeAll();
                const pointGraphic = pointResult.graphic;
                pointGraphic.symbol = {
                    type: "simple-marker",
                    color: [255, 120, 30, 0.6],
                    size: 12,
                    outline: {
                        color: [255, 55, 66],
                        width: 2
                    }
                };
                SelectedParcelpoint_graphicsLayer.add(pointGraphic);
                const landID = pointGraphic.attributes.Parcel_ID;

                // إزالة التحديد السابق (إن وجد)
                //if (pointHighlight) {
                //    pointHighlight.remove();
                //}

                //// تحديد النقطة المحددة
                //pointHighlight = pointLayerView.highlight(pointGraphic);

                // نستخدم LandID للاستعلام عن البوليجون من الطبقة الرئيسية
                Lands_polygon.queryFeatures({
                    where: "Parcel_ID = " + landID,
                    outFields: ["*"],
                    returnGeometry: true
                }).then(function (landResponse) {
                    if (landResponse.features.length > 0) {
                        const landFeature = landResponse.features[0];

                        // فتح popup عند وسط الأرض أو عند مكان النقرة
                        view.popup.open({
                            features: [landFeature],
                            location: landFeature.geometry.centroid  // يمكنك تغييره إلى event.mapPoint
                        });
                    } else {
                        console.warn("لم يتم العثور على بوليجون مرتبط بالمعرف:", landID);
                    }
                });
            },
            OpenParcelPopup2: function (SelectedParcelpoint_graphicsLayer, pointResult, Rent_polygon, view) {
                SelectedParcelpoint_graphicsLayer.removeAll();
                const pointGraphic = pointResult.graphic;
                pointGraphic.symbol = {
                    type: "simple-marker",
                    color: [255, 120, 30, 0.6],
                    size: 12,
                    outline: {
                        color: [255, 55, 66],
                        width: 2
                    }
                };
                SelectedParcelpoint_graphicsLayer.add(pointGraphic);
                const OBJECTID = pointGraphic.attributes.OBJECTID;

                // إزالة التحديد السابق (إن وجد)
                //if (pointHighlight) {
                //    pointHighlight.remove();
                //}

                //// تحديد النقطة المحددة
                //pointHighlight = pointLayerView.highlight(pointGraphic);

                // نستخدم LandID للاستعلام عن البوليجون من الطبقة الرئيسية
                Rent_polygon.queryFeatures({
                    where: "OBJECTID = " + OBJECTID,
                    outFields: ["*"],
                    returnGeometry: true
                }).then(function (landResponse) {
                    if (landResponse.features.length > 0) {
                        const landFeature = landResponse.features[0];

                        // فتح popup عند وسط الأرض أو عند مكان النقرة
                        view.popup.open({
                            features: [landFeature],
                            location: landFeature.geometry.centroid  // يمكنك تغييره إلى event.mapPoint
                        });
                    } else {
                        console.warn("لم يتم العثور على بوليجون مرتبط بالمعرف:", landID);
                    }
                });
            },
            ZoomTo_MasterPlan: function (Parcel_ID, view2, Lands_polygon) {
                let query = Lands_polygon.createQuery();
                query.where = "Parcel_ID=" + Parcel_ID;
                query.returnGeometry = true;
                Lands_polygon.queryFeatures(query)
                    .then(function (response) {
                        const feature = response.features[0];
                        view2.goTo({
                            target: feature.geometry,
                            target: feature.geometry,
                            zoom: 18,
                            heading: 0,
                            tilt: 60

                        }).catch((error) => {
                            view2.goTo({
                                target: feature.geometry,
                                zoom: 18,
                                heading: 0,
                                tilt: 60

                            })
                        });


                    });
            },
            ZoomTo3D: function (Parcel_ID, view3, Lands_polygon) {
                let query = Lands_polygon.createQuery();
                query.where = "Parcel_ID=" + Parcel_ID;
                query.returnGeometry = true;
                Lands_polygon.queryFeatures(query)
                    .then(function (response) {
                        if (response.features.length) {
                            const feature = response.features[0];


                            // تحقق من توفر geometry قبل goTo
                            if (feature && feature.geometry) {
                                view3.goTo({
                                    target: feature.geometry,
                                    zoom: 19,
                                    heading: 0,
                                    tilt: 80

                                }).catch((error) => {

                                    view3.goTo({
                                        target: feature.geometry,
                                        zoom: 19,
                                        heading: 0,
                                        tilt: 80
                                    })
                                });

                            } else {
                                console.error("Geometry is undefined at goTo");
                            }


                        }

                    });
            },
            getQueryParam: function (param) {
                const queryString = window.location.search.substring(1);
                const params = queryString.split("&");

                for (const paramPair of params) {
                    const [key, value] = paramPair.split("=");
                    if (key === param) {
                        return decodeURIComponent(value);
                    }
                }
                return null; // Return null if the parameter doesn't exist
            },

            //----------------Clubs Componants----------------
            Initiat_Building: async function () {
                var FL_Buildings = await InitiatFeatureLayer("Mos_assetes", 3,"المباني الداخلية");


                FL_Buildings.popupTemplate = {
                    fieldInfos: [
                        {
                            fieldName: "Description_Name",
                            label: "وصف المبنى"
                        },
                        {
                            fieldName: "Building_Tybe",
                            label: "نوع المبني"
                        },
                        {
                            fieldName: "AreaM",
                            label: " المساحة بالمتر مربع"
                        },

                        {
                            fieldName: "Bulding_Material",
                            label: "مواد البناء"
                        },
                        {
                            fieldName: "Roof_Material",
                            label: "مادة السقف"

                        },
                        {
                            fieldName: "Floors ",
                            label: "عدد الادوار"

                        }
                        ,
                        {
                            fieldName: "Construction_Defectes",
                            label: "العيوب الانشائية"


                        },

                        {
                            fieldName: "Bulding_Sutabilty",
                            label: "مدى ملائمة المبنى للحالة الوظيفية"


                        },


                        {
                            fieldName: "Construction_Safty",
                            label: "حالة المبنى من ناحية الأمان"


                        }

                        // Add more fields as needed
                    ],
                    content: [{
                        type: "media",
                        mediaInfos: [{
                            type: "image", // Specify this is an image
                            value: {
                                sourceURL: `/api/Proxy/GetBuidingImage?Type=مباني&parcelId={Parcel_id}&FolderName={Images_Folder}&Index=0`
                            },
                            caption: "صور الاصل"
                        },
                        {
                            type: "image", // Specify this is an image
                            value: {
                                sourceURL: `/api/Proxy/GetBuidingImage?Type=مباني&parcelId={Parcel_id}&FolderName={Images_Folder}&Index=1`
                            },
                            caption: "صور الاصل"
                            },
                            {
                                type: "image", // Specify this is an image
                                value: {
                                    sourceURL: `/api/Proxy/GetBuidingImage?Type=مباني&parcelId={Parcel_id}&FolderName={Images_Folder}&Index=2`
                                },
                                caption: "صور الاصل"
                            },
                            {
                                type: "image", // Specify this is an image
                                value: {
                                    sourceURL: `/api/Proxy/GetBuidingImage?Type=مباني&parcelId={Parcel_id}&FolderName={Images_Folder}&Index=3`
                                },
                                caption: "صور الاصل"
                            }]
                    },

                        {
                            type: "fields"

                        }]

                }



                return FL_Buildings;
            },
            Initiat_PlayGround: async function () {
                var FL_PlayGrounds = await InitiatFeatureLayer("Mos_assetes", 4, "الملاعب");



                FL_PlayGrounds.popupTemplate = {
                    fieldInfos: [
                        {
                            fieldName: "Description_Name",
                            label: "الوصف"
                        },
                        {
                            fieldName: "playground_Type",
                            label: "نوع الملعب"
                        },
                        {
                            fieldName: "AreaM",
                            label: " المساحة بالمتر مربع"
                        },

                        {
                            fieldName: "Status",
                            label: "الحالة"
                        },
                        {
                            fieldName: "Floor_type",
                            label: "نوع الارضية"

                        },
                        {
                            fieldName: "Boundry_Type",
                            label: "نوع السور"

                        }
                        ,
                        {
                            fieldName: "Sutability",
                            label: "مدى الملائمة"


                        }

                        // Add more fields as needed
                    ],
                    content: [{
                        type: "media",
                        mediaInfos: [{
                            type: "image", // Specify this is an image
                            value: {
                                sourceURL: `/api/Proxy/GetBuidingImage?Type=ملاعب&parcelId={Parcel_id}&FolderName={Images_Folder}&Index=0`
                            },
                            caption: "صور الاصل"
                        },
                        {
                            type: "image", // Specify this is an image
                            value: {
                                sourceURL: `/api/Proxy/GetBuidingImage?Type=ملاعب&parcelId={Parcel_id}&FolderName={Images_Folder}&Index=1`
                            },
                            caption: "صور الاصل"
                        },
                        {
                            type: "image", // Specify this is an image
                            value: {
                                sourceURL: `/api/Proxy/GetBuidingImage?Type=ملاعب&parcelId={Parcel_id}&FolderName={Images_Folder}&Index=2`
                            },
                            caption: "صور الاصل"
                        },
                        {
                            type: "image", // Specify this is an image
                            value: {
                                sourceURL: `/api/Proxy/GetBuidingImage?Type=ملاعب&parcelId={Parcel_id}&FolderName={Images_Folder}&Index=3`
                            },
                            caption: "صور الاصل"
                        }]
                    },

                        {
                            type: "fields"

                        }]

                }



                return FL_PlayGrounds;
            },
            Initiat_Facility_Services: async function () {
                var FL_Facility_Services = await InitiatFeatureLayer("Mos_assetes", 5, "الخدمات");



                FL_Facility_Services.popupTemplate = {
                    // Title field from the feature attributes
                    fieldInfos: [
                        {
                            fieldName: "Service_Type",
                            label: "نوع الخدمة"
                        },
                        {
                            fieldName: "Constraction_Status",
                            label: "الحالة الإنشائية"
                        },
                        {
                            fieldName: "Is_Operational",
                            label: "هل تعمل حاليًا"
                        },

                        {
                            fieldName: "Installation_Date",
                            label: "تاريخ التركيب"
                        },
                        {
                            fieldName: "Last_Maintenance",
                            label: "آخر صيانة"

                        },
                        {
                            fieldName: "Owner_Entity",
                            label: "الجهة المسؤولة"

                        }
                        ,
                        {
                            fieldName: "Notes",
                            label: "ملاحظات إضافية"


                        }

                        // Add more fields as needed
                    ],
                    content: [

                        {
                            type: "fields"

                        }]

                }



                return FL_Facility_Services;
            },
            Initiat_Mobile_Rooms: async function () {
                var FL_Mobile_Rooms = await InitiatFeatureLayer("Mos_assetes", 7, "الغرف المؤقته");



                FL_Mobile_Rooms.popupTemplate = {
                    // Title field from the feature attributes
                    fieldInfos: [
                        {
                            fieldName: "Room_Type",
                            label: "نوع الغرفة"
                        },
                        {
                            fieldName: "Constraction_Status",
                            label: "الحالة الإنشائية"
                        },
                        {
                            fieldName: "Current_Location",
                            label: "وصف الموقع الحالي"
                        },

                        {
                            fieldName: "Installation_Date",
                            label: "تاريخ التركيب"
                        },
                        {
                            fieldName: "Installation_Date",
                            label: "آتاريخ التركيب"

                        },
                        {
                            fieldName: "Last_Movement_Date",
                            label: "آخر تاريخ لنقل الغرفة"

                        }
                        ,
                        {
                            fieldName: "Is_Connected",
                            label: "هل الغرفة متصلة بالخدمات"


                        }
                        ,
                        {
                            fieldName: "Notes",
                            label: "ملاحظات إضافية"


                        }


                        // Add more fields as needed
                    ],
                    content: [

                        {
                            type: "fields"

                        }]

                }



                return FL_Mobile_Rooms;
            },
            Initiat_Parking_Area: async function () {
                var FL_Parking_Area = await InitiatFeatureLayer("Mos_assetes", 6, "المواقف");



                FL_Parking_Area.popupTemplate = {
                    // Title field from the feature attributes
                    fieldInfos: [
                        {
                            fieldName: "Parking_Type",
                            label: "نوع الموقف"
                        },
                        {
                            fieldName: "Coverage_Type",
                            label: "التغطية"
                        },
                        {
                            fieldName: "Capacity",
                            label: "عدد السيارات الممكن استيعابها"
                        },

                        {
                            fieldName: "Is_Shaded",
                            label: "هل يحتوي على مظلات؟"
                        },
                        {
                            fieldName: "Is_Accessible",
                            label: "هل يحتوي على مواقف مخصصة لذوي الإعاقة؟"

                        },
                        {
                            fieldName: "Entry_Points",
                            label: "عدد مداخل الموقف"

                        }
                        ,
                        {
                            fieldName: "Exit_Points",
                            label: "عدد مخارج الموقف"


                        }
                        ,
                        {
                            fieldName: "Condition_Status",
                            label: "الحالة"


                        }
                        ,
                        {
                            fieldName: "Notes",
                            label: "ملاحظات إضافية"


                        }

                        // Add more fields as needed
                    ],
                    content: [

                        {
                            type: "fields"

                        }]

                }



                return FL_Parking_Area;
            },
            Initiat_Shading_Strctures: async function () {
                var FL_Shading_Strctures = await InitiatFeatureLayer("Mos_assetes", 8, "المظلات");



                FL_Shading_Strctures.popupTemplate = {
                    // Title field from the feature attributes
                    fieldInfos: [
                        {
                            fieldName: "Shade_Type",
                            label: "نوع المظلة"
                        },
                        {
                            fieldName: "Material",
                            label: "نوع المادة"
                        },
                        {
                            fieldName: "Area_m2 ",
                            label: "المساحة المغطاة بالمتر المربع"
                        },

                        {
                            fieldName: "Installation_Year",
                            label: "سنة التركيب"
                        },
                        {
                            fieldName: "Is_Seating_Area",
                            label: "هل تحتوي على كراسي أو منطقة جلوس؟"

                        }
                        ,
                        {
                            fieldName: "Notes",
                            label: "ملاحظات إضافية"


                        }

                        // Add more fields as needed
                    ],
                    content: [

                        {
                            type: "fields"

                        }]

                }



                return FL_Shading_Strctures;
            },
            Initiat_Internal_Path: async function () {
                var FL_Internal_Path = new FeatureLayer({
                    url: "https://p-dc1-sv-ezr-03.mos.gov.sa/server/rest/services/MOS_Lands_Final/MapServer/3"
                    , mode: FeatureLayer.MODE_ONDEMAND, // فقط البيانات في Extent الحالي

                    outFields: ["*"], // Fetch all fields for popup
                });


                FL_Internal_Path.popupTemplate = {
                    // Title field from the feature attributes
                    fieldInfos: [
                        {
                            fieldName: "Path_Type",
                            label: "نوع الممر"
                        },
                        {
                            fieldName: "Surface_Type",
                            label: "نوع الأرضية"
                        },
                        {
                            fieldName: "Width_m",
                            label: "عرض الممر"
                        },

                        {
                            fieldName: "Length_m",
                            label: "طول الممر"
                        },
                        {
                            fieldName: "Accessibility",
                            label: "قابلية الوصول لذوي الإعاقة"

                        }
                        ,
                        {
                            fieldName: "Lighting",
                            label: "هل يحتوي على إنارة؟"


                        }
                        ,
                        {
                            fieldName: "FieldShading",
                            label: "هل يحتوي على تظليل؟"


                        }
                        ,
                        {
                            fieldName: "Notes ",
                            label: "ملاحظات إضافية"


                        }
                        // Add more fields as needed
                    ],
                    content: [

                        {
                            type: "fields"

                        }]

                }



                return FL_Internal_Path;
            },
            Initiat_Fences: async function () {
                var FL_Fences = new FeatureLayer({
                    url: "https://p-dc1-sv-ezr-03.mos.gov.sa/server/rest/services/MOS_Lands_Final/MapServer/4"
                    , mode: FeatureLayer.MODE_ONDEMAND, // فقط البيانات في Extent الحالي

                    outFields: ["*"], // Fetch all fields for popup
                });



                FL_Fences.popupTemplate = {
                    // Title field from the feature attributes
                    fieldInfos: [
                        {
                            fieldName: "Fence_Type",
                            label: "نوع السور"
                        },
                        {
                            fieldName: "Height_m",
                            label: " ارتفاع السور"
                        },
                        {
                            fieldName: "Material  ",
                            label: "المادة المستخدمة"
                        },

                        {
                            fieldName: "Gate_Count",
                            label: "عدد البوابات"
                        },
                        {
                            fieldName: "Condition_Status ",
                            label: "الحالة"

                        }
                        ,
                        {
                            fieldName: "Installation_Year",
                            label: " سنة الإنشاء"


                        },
                        {
                            fieldName: "Security_Level",
                            label: " مستوى الأمان"


                        },
                        {
                            fieldName: "Notes",
                            label: "ملاحظات إضافية"


                        }

                        // Add more fields as needed
                    ],
                    content: [

                        {
                            type: "fields"

                        }]

                }



                return FL_Fences;
            },
            Initiat_Gate: async function () {
                var FL_Shading_Strctures = new FeatureLayer({
                    url: "https://p-dc1-sv-ezr-03.mos.gov.sa/server/rest/services/MOS_Lands_Final/MapServer/5"
                    , mode: FeatureLayer.MODE_ONDEMAND, // فقط البيانات في Extent الحالي

                    outFields: ["*"], // Fetch all fields for popup
                });



                FL_Shading_Strctures.popupTemplate = {
                    // Title field from the feature attributes
                    fieldInfos: [
                        {
                            fieldName: "Gate_Type",
                            label: "نوع البوابة"
                        },
                        {
                            fieldName: "Access_Type",
                            label: "طريقة الوصول"
                        },
                        {
                            fieldName: "Control_Type",
                            label: "نوع التحكم"
                        },

                        {
                            fieldName: "Opening_Hours",
                            label: "أوقات الفتح والإغلاق"
                        },
                        {
                            fieldName: "Security_Level",
                            label: "مستوى الامان"

                        }
                        ,
                        {
                            fieldName: "Notes",
                            label: "ملاحظات إضافية"


                        }

                        // Add more fields as needed
                    ],
                    content: [

                        {
                            type: "fields"

                        }]

                }



                return FL_Shading_Strctures;
            },
            Initiat_Green_Area: async function () {
                var FL_Shading_Strctures = new FeatureLayer({
                    url: "https://p-dc1-sv-ezr-03.mos.gov.sa/server/rest/services/MOS_Lands_Final/MapServer/12"
                    , mode: FeatureLayer.MODE_ONDEMAND, // فقط البيانات في Extent الحالي

                    outFields: ["*"], // Fetch all fields for popup
                });



                FL_Shading_Strctures.popupTemplate = {
                    // Title field from the feature attributes
                    fieldInfos: [
                        {
                            fieldName: "Area_Type",
                            label: "النوع"
                        },
                        {
                            fieldName: "Surface_Area_m2",
                            label: "المساحة الإجمالية"
                        },
                        {
                            fieldName: "Irrigation_Type",
                            label: " نوع الري المستخدم"
                        },

                        {
                            fieldName: "Plant_Density",
                            label: "كثافة النباتات"
                        },
                        {
                            fieldName: "Maintenance_Frequency",
                            label: "عدد مرات الصيانة"

                        }
                        ,
                        {
                            fieldName: "Condition_Status ",
                            label: "الحالة العامة "


                        }
                        ,
                        {
                            fieldName: "Is_Shaded",
                            label: "هل تحتوي على مظلات أو أشجار ظل؟"


                        }
                        ,
                        {
                            fieldName: "Notes ",
                            label: "ملاحظات إضافية"


                        }
                        // Add more fields as needed
                    ],
                    content: [

                        {
                            type: "fields"

                        }]

                }



                return FL_Shading_Strctures;
            },
            Initiat_Lighting_Point: async function () {
                var FL_Shading_Strctures = new FeatureLayer({
                    url: "https://p-dc1-sv-ezr-03.mos.gov.sa/server/rest/services/MOS_Lands_Final/MapServer/17"
                    , mode: FeatureLayer.MODE_ONDEMAND, // فقط البيانات في Extent الحالي

                    outFields: ["*"], // Fetch all fields for popup
                });



                FL_Shading_Strctures.popupTemplate = {
                    // Title field from the feature attributes
                    fieldInfos: [
                        {
                            fieldName: "Shade_Type",
                            label: "نوع المظلة"
                        },
                        {
                            fieldName: "Material",
                            label: "نوع المادة"
                        },
                        {
                            fieldName: "Area_m2 ",
                            label: "المساحة المغطاة بالمتر المربع"
                        },

                        {
                            fieldName: "Installation_Year",
                            label: "سنة التركيب"
                        },
                        {
                            fieldName: "Is_Seating_Area",
                            label: "هل تحتوي على كراسي أو منطقة جلوس؟"

                        }
                        ,
                        {
                            fieldName: "Notes",
                            label: "ملاحظات إضافية"


                        }

                        // Add more fields as needed
                    ],
                    content: [

                        {
                            type: "fields"

                        }]

                }



                return FL_Shading_Strctures;
            },
            Initiat_Recreational_Area: async function () {
                var FL_Shading_Strctures = new FeatureLayer({
                    url: "https://p-dc1-sv-ezr-03.mos.gov.sa/server/rest/services/MOS_Lands_Final/MapServer/8"
                    , mode: FeatureLayer.MODE_ONDEMAND, // فقط البيانات في Extent الحالي

                    outFields: ["*"], // Fetch all fields for popup
                });



                FL_Shading_Strctures.popupTemplate = {
                    // Title field from the feature attributes
                    fieldInfos: [
                        {
                            fieldName: "Rec_Type",
                            label: "نوع النشاط"
                        },
                        {
                            fieldName: "Surface_Type",
                            label: "نوع الأرضية"
                        },
                        {
                            fieldName: "Area_m2 ",
                            label: "المساحة "
                        },

                        {
                            fieldName: "Is_Shaded",
                            label: "هل تحتوي على مظلات أو أشجار ظل؟"
                        },
                        {
                            fieldName: "Is_Fenced",
                            label: " هل المنطقة محاطة بسياج؟"

                        },
                        {
                            fieldName: "Condition_Status",
                            label: "الحالة العامة"

                        }

                        ,
                        {
                            fieldName: "Notes",
                            label: "ملاحظات إضافية"


                        }

                        // Add more fields as needed
                    ],
                    content: [

                        {
                            type: "fields"

                        }]

                }



                return FL_Shading_Strctures;
            },
            Initiat_Signage: async function () {
                var FL_Shading_Strctures = new FeatureLayer({
                    url: "https://p-dc1-sv-ezr-03.mos.gov.sa/server/rest/services/MOS_Lands_Final/MapServer/15"
                    , mode: FeatureLayer.MODE_ONDEMAND, // فقط البيانات في Extent الحالي

                    outFields: ["*"], // Fetch all fields for popup
                });



                FL_Shading_Strctures.popupTemplate = {
                    // Title field from the feature attributes
                    fieldInfos: [
                        {
                            fieldName: "Sign_Type",
                            label: "نوع اللوحة"
                        },
                        {
                            fieldName: "Content_Summary",
                            label: "وصف مختصر لمحتوى اللوحة"
                        },
                        {
                            fieldName: "Material",
                            label: "نوع المادة"
                        },

                        {
                            fieldName: "Condition_Status",
                            label: "الحالة"
                        },
                        {
                            fieldName: "Is_Illuminated",
                            label: "هل تحتوي على إنارة؟"

                        },
                        {
                            fieldName: "Language",
                            label: "اللغة المستخدمة"

                        }
                        ,
                        {
                            fieldName: "Notes",
                            label: "ملاحظات إضافية"


                        }

                        // Add more fields as needed
                    ],
                    content: [

                        {
                            type: "fields"

                        }]

                }



                return FL_Shading_Strctures;
            },
            Initiat_Stands: async function () {
                var FL_Stands = await InitiatFeatureLayer("Mos_assetes", 9, "المدرجات");


                FL_Stands.popupTemplate = {
                    // Title field from the feature attributes
                    fieldInfos: [
                        {
                            fieldName: "Stand_Type",
                            label: "نوع المدرج"
                        },
                        {
                            fieldName: "Capacity",
                            label: "عدد المقاعد"
                        },
                        {
                            fieldName: "Covered",
                            label: "هل يحتوي على مظلة أو سقف؟"
                        },

                        {
                            fieldName: "Construction_Year",
                            label: "سنة الإنشاء"
                        },
                        {
                            fieldName: "Condition_Status",
                            label: "الحالة"

                        }
                        ,
                        {
                            fieldName: "Notes",
                            label: "ملاحظات إضافية"


                        }

                        // Add more fields as needed
                    ],
                    content: [

                        {
                            type: "fields"

                        }]

                }



                return FL_Stands;
            },
            Initiat_Vegetation: async function () {
                var FL_Shading_Strctures = new FeatureLayer({
                    url: "https://p-dc1-sv-ezr-03.mos.gov.sa/server/rest/services/MOS_Lands_Final/MapServer/16"
                    , mode: FeatureLayer.MODE_ONDEMAND, // فقط البيانات في Extent الحالي

                    outFields: ["*"], // Fetch all fields for popup
                });



                FL_Shading_Strctures.popupTemplate = {
                    // Title field from the feature attributes
                    fieldInfos: [
                        {
                            fieldName: "Species_Name",
                            label: "الاسم العملى"
                        },
                        {
                            fieldName: "Plant_Type",
                            label: "نوع النبات "
                        },
                        {
                            fieldName: "Height_m",
                            label: "الارتفاع التقريبي"
                        },

                        {
                            fieldName: "Planted_Year",
                            label: "سنة الزراعة"
                        },
                        {
                            fieldName: "Irrigation_Type",
                            label: "نوع الرى"

                        }
                        ,

                        {
                            fieldName: "Health_Status",
                            label: " الحالة الصحية"
                        },
                        {
                            fieldName: "Is_Protected",
                            label: "هل النبتة محمية أو ذات أهمية خاصة؟"

                        }
                        ,
                        {
                            fieldName: "Notes",
                            label: "ملاحظات إضافية"


                        }

                        // Add more fields as needed
                    ],
                    content: [

                        {
                            type: "fields"

                        }]

                }



                return FL_Shading_Strctures;
            },
            //------------
            Initiat_Rented_Sites_Point: async function () {
                var Rented_Sites_Point = await InitiatFeatureLayer("Rental_Locations", 0, "المواقع المستأجرة");
         
                return Rented_Sites_Point;
            },
            Initiat_Rented_Sites: async function (UserType) {
                var Rented_Sites = await InitiatFeatureLayer("Rental_Locations", 1, "حدود المواقع المستأجرة");
                Rented_Sites.popupTemplate = {
                    title: "{Parcel_Name}",  // Title field from the feature attributes
                    fieldInfos: [{
                        fieldName: "Parcel_Name",
                        label: "أسم الموقع"
                    },
                    {
                        fieldName: "Region_Name",
                        label: "المنطقة"
                    },
                    {
                        fieldName: "Branch_Name",
                        label: "اسم الفرع"
                    },
                    {
                        fieldName: "Club_Usege",
                        label: "الاستخدام"
                    },
                    {
                        fieldName: "Founding_Year",
                        label: "سنة التأسيس"
                    },
                    {
                        fieldName: "Ownership",
                        label: "اسم المالك"
                    },
                    {
                        fieldName: "Start_of_lease",
                        label: "تاريخ بداية العقد"
                    },
                    {
                        fieldName: "Lease_experation_date",
                        label: "تاريخ انتهاء العقد"
                        },
                        {
                            fieldName: "Rent_Period",
                            label: "مدة العقد"
                        }
                    ],
                    content: [{
                        type: "fields"

                    }]

                };
                if (UserType == 'super') {
                    Rented_Sites.popupTemplate.fieldInfos.push({
                        fieldName: "Rental_value",
                        label: "قيمة العقد"
                    });

                }
    
                return Rented_Sites;
            },
            GoToRented_SitesByID: function (Parcel_ID, Initiat_Rented_Sites, view) {
                let query = Initiat_Rented_Sites.createQuery();
                query.where = "OBJECTID=" + Parcel_ID;
                query.returnGeometry = true;
                Initiat_Rented_Sites.queryFeatures(query)
                    .then(function (response) {
                        view.goTo({
                            target: response.features[0].geometry,
                            scale: 1000,   // كلما زاد الرقم = تبتعد أكثر

                            heading: 0,
                            tilt: 45
                        }, {
                            animate: true
                        }).catch((error) => {
                            view.goTo({
                                target: response.features[0].geometry,
                                scale: 100000,   // كلما زاد الرقم = تبتعد أكثر

                                heading: 0,
                                tilt: 45
                            }, {
                                animate: true
                            })

                        });
                        view.popup.open({
                            features: [response.features[0]],
                            location: response.features[0].geometry
                        });
                    });

            },
            Initiat_Analysis_FL: async function (ID) {

                var Analysis_FL = new FeatureLayer({
                    url: "https://services9.arcgis.com/1LMESIsvEbTzhwT2/arcgis/rest/services/MOT_Analysis/FeatureServer/" + ID,
                    mode: FeatureLayer.MODE_ONDEMAND, // فقط البيانات في Extent الحالي
                    outFields: ["*"], // Fetch all
                });
                Analysis_FL.popupTemplate = {
                    fieldInfos: [
                        {
                            fieldName: "REGIONARNAME",
                            label: "المنطقة"
                        },
                        {
                            fieldName: "Total",
                            label: "القيمة"
                        }
                    ],
                    content: [

                        {
                            type: "fields"

                        }
                    ]
                };
                return Analysis_FL;
            },
            Initiat_CityAnalysis_FL: async function (ID) {
                var CityAnalysis_FL = await InitiatFeatureLayer("City_Analysis", ID);
                CityAnalysis_FL.popupTemplate = {
                    fieldInfos: [
                        {
                            fieldName: "name_ar",
                            label: "المنطقة"
                        },
                        {
                            fieldName: "Count",
                            label: "القيمة"
                        }
                    ],
                    content: [

                        {
                            type: "fields"

                        }
                    ]
                };
                return CityAnalysis_FL;
            } ,
            Initial_PrintService: async function (view, container) {
                try {
                    // 1️⃣ جلب رابط الطبقة من الخادم

                    const res = await fetch("/api/Proxy/PrintUrl");
                    const data = await res.json();

                    if (!data?.url)
                        throw new Error("لم يتم العثور على رابط الطبقة من الخادم.");

                    // 2️⃣ جلب التوكن من الخادم (.NET)
                    const tokenRes = await fetch("/api/Proxy/GetPortalTokenAsync");
                    if (!tokenRes.ok)
                        throw new Error("فشل في الاتصال بالخادم للحصول على التوكن.");

                    const tokenData = await tokenRes.json();
                    const token = tokenData?.token;

                    if (!token)
                        throw new Error("فشل في الحصول على التوكن من الخادم.");

                    // 3️⃣ تسجيل التوكن في ArcGIS IdentityManager
                    IdentityManager.registerToken({
                        server: "https://p-dc1-sv-ezr-03.mos.gov.sa/server/rest/services",
                        token: token,
                        userId: "service_user",
                        expires: Date.now() + 60 * 60 * 1000 // ساعة واحدة
                    });

                    // 4️⃣ إنشاء طبقة FeatureLayer بدون تضمين التوكن في الرابط
                    print = new Print({
                        view: view,
                        container: container,
                        printServiceUrl: data.url

                    });
                    console.log("✅ تم تحميل طبقة الأراضي بنجاح.");
                    return print;

                } catch (error) {
                    console.error("❌ حدث خطأ أثناء تحميل طبقة الأراضي:", error);
                    return null;
                }
            }


        }
        async function InitiatFeatureLayer(ServiceName, layerId,Title) {
            try {
                // 1️⃣ جلب رابط الطبقة من الخادم
                
                const res = await fetch("/api/Proxy/layerUrl?layerId=" + layerId + "&serviceName=" + ServiceName);
                    const data = await res.json();

                    if (!data?.url)
                        throw new Error("لم يتم العثور على رابط الطبقة من الخادم.");

                    // 2️⃣ جلب التوكن من الخادم (.NET)
                const tokenRes = await fetch("/api/Proxy/GetPortalTokenAsync");
                    if (!tokenRes.ok)
                        throw new Error("فشل في الاتصال بالخادم للحصول على التوكن.");

                    const tokenData = await tokenRes.json();
                    const token = tokenData?.token;

                    if (!token)
                        throw new Error("فشل في الحصول على التوكن من الخادم.");

                    // 3️⃣ تسجيل التوكن في ArcGIS IdentityManager
                    IdentityManager.registerToken({
                        server: "https://p-dc1-sv-ezr-03.mos.gov.sa/server/rest/services",
                        token: token,
                        userId: "service_user",
                        expires: Date.now() + 60 * 60 * 1000 // ساعة واحدة
                    });

                    // 4️⃣ إنشاء طبقة FeatureLayer بدون تضمين التوكن في الرابط
                    const layer = new FeatureLayer({
                        url: data.url,
                        outFields: ["*"],
                        title: Title
                    });

                    console.log("✅ تم تحميل طبقة الأراضي بنجاح.");
                    return layer;

                } catch (error) {
                    console.error("❌ حدث خطأ أثناء تحميل طبقة الأراضي:", error);
                    return null;
                }
        }
        function convertToDirectLink(driveLink) {
            // استخراج معرف الملف (ID) من الرابط
            // المعرف يكون الجزء الواقع بين /d/ و /view
            const fileIdMatch = driveLink.match(/\/d\/([a-zA-Z0-9_-]+)/);

            if (fileIdMatch && fileIdMatch[1]) {
                const fileId = fileIdMatch[1];
                // تحويله إلى الرابط المباشر الخاص بجوجل
                return `https://lh3.googleusercontent.com/d/${fileId}`;
            }
            return driveLink; // إرجاع الرابط الأصلي إذا لم يتم العثور على المعرف
        }                                                                                   
        });
