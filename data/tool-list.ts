import {
    AndroidOutlined,
    LaptopOutlined,
    MobileOutlined,
    SettingOutlined,
    ToolOutlined,
} from "@ant-design/icons";

type ToolsType = {
    title: string;
    color: string;
    text_color?: string;
    items: {
        label: string;
        icon?: typeof ToolOutlined;
        image?: string;
        color?: string;
        url: string;
    }[];
};

export const TOOLS_DATA: ToolsType[] = [
    {
        title: "Geodetic Survey",
        color: "volcano",
        items: [
            {
                label: "GPS Handheld",
                icon: ToolOutlined,
                url: "https://en.wikipedia.org/wiki/Satellite_navigation_device",
            },
            {
                label: "Theodolite",
                icon: ToolOutlined,
                url: "https://en.wikipedia.org/wiki/Theodolite",
            },
            {
                label: "Waterpass",
                icon: ToolOutlined,
                url: "https://id.wikipedia.org/wiki/Waterpass",
            },
            {
                label: "Total Station (TS)",
                icon: ToolOutlined,
                url: "https://en.wikipedia.org/wiki/Total_station",
            },
            {
                label: "GPS Geodetic",
                icon: ToolOutlined,
                url: "https://en.wikipedia.org/wiki/Global_Positioning_System",
            },
            {
                label: "Unmanned Aerial Vehicle (UAV) / Drone",
                icon: ToolOutlined,
                url: "https://en.wikipedia.org/wiki/Unmanned_aerial_vehicle",
            },
        ],
    },
    {
        title: "GIS / Spatial Data",
        color: "blue",
        items: [
            {
                label: "QGIS",
                image: "https://qgis.org/en/_static/images/favicon.ico",
                url: "https://qgis.org/en/site/",
            },
            {
                label: "DWG TrueView",
                image: "https://damassets.autodesk.net/content/dam/autodesk/www/product-imagery/badge-150x150/dwg-trueview-2022-badge-150x150.png",
                url: "https://www.autodesk.com/viewers",
            },
            {
                label: "AutoCAD Map 3D",
                image: "https://damassets.autodesk.net/content/dam/autodesk/www/products/responsive-imagery/responsive-badges-compare/2017/autocad-2017-badge-75x75.png",
                // image: "https://knowledge.autodesk.com/sites/default/files/product-logo-sm/autocad-map-3d-2020-badge-75x75.png",
                url: "https://knowledge.autodesk.com/support/autocad-map-3d",
            },
            {
                label: "WebODM (OpenDroneMap)",
                image: "https://www.opendronemap.org/wp-content/uploads/2018/07/odm-logo.svg",
                url: "https://www.opendronemap.org/webodm/",
            },
            {
                label: "Google My Maps",
                image: "https://www.gstatic.com/mapspro/images/favicon-001.ico",
                url: "https://www.google.com/maps/about/mymaps/",
            },
        ],
    },
    {
        title: "Application Development",
        color: "magenta",
        items: [
            {
                label: "Android Application",
                icon: AndroidOutlined,
                url: "https://www.android.com/",
            },
            {
                label: "Web Application",
                icon: LaptopOutlined,
                url: "https://en.wikipedia.org/wiki/Web_application",
            },
            {
                label: "Progressive Web Application (PWA)",
                icon: LaptopOutlined,
                url: "https://en.wikipedia.org/wiki/Progressive_web_application",
            },
            {
                label: "Single Page Application (SPA)",
                icon: MobileOutlined,
                url: "https://en.wikipedia.org/wiki/Single-page_application",
            },
            {
                label: "Trusted Web Activities (TWA)",
                icon: MobileOutlined,
                url: "https://developer.chrome.com/docs/android/trusted-web-activity/overview/",
            },
            {
                label: "Multiplatform Application",
                icon: MobileOutlined,
                url: "https://en.wikipedia.org/wiki/Cross-platform_software",
            },
        ],
    },
    {
        title: "Android Development",
        color: "green",
        items: [
            {
                label: "Java",
                image: "https://www.java.com/favicon.ico",
                url: "https://java.com/",
            },
            {
                label: "Kotlin",
                image: "https://kotlinlang.org/assets/images/favicon.ico",
                url: "https://kotlinlang.org/",
            },
            {
                label: "XML",
                image: "https://www.w3.org/assets/logos/w3c/w3c-no-bars.svg",
                url: "https://www.w3.org/XML/",
            },
            {
                label: "Glide",
                image: "https://bumptech.github.io/glide/favicon-32x32.png",
                url: "https://github.com/bumptech/glide",
            },
            {
                label: "Retrofit",
                image: "https://square.github.io/retrofit/static/icon-square.png",
                url: "https://github.com/square/retrofit",
                color: "green",
            },
            {
                label: "Room Database",
                image: "https://android.com/static/images/fav/favicon.ico",
                url: "https://developer.android.com/jetpack/androidx/releases/room",
            },
            {
                label: "Mapbox Maps SDK",
                image: "https://www.mapbox.com/favicon.ico",
                url: "https://docs.mapbox.com/android/maps/guides/",
            },
            {
                label: "AdMob",
                image: "https://lh3.googleusercontent.com/EwQLQxa1pSegPqc5tjJItXuOtZiWh8ZriX_Gvt_Pw5Je3VGKuY7-o2SDXuoGwjBGtfY4Xvw3IJ4YnsKvRZptQNXGCQHyv0yGbLWb-2w",
                url: "https://admob.google.com/",
            },
            {
                label: "AppLovin",
                image: "https://www.applovin.com/wp-content/uploads/2019/09/cropped-applovin-favicon-rev-9-2019-32x32.png",
                url: "https://www.applovin.com/",
            },
        ],
    },
    {
        title: "Web Development",
        color: "orange",
        items: [
            {
                label: "HTML & CSS",
                image: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg",
                url: "https://www.w3.org/standards/webdesign/htmlcss.html",
            },
            {
                label: "JavaScript",
                image: "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg",
                url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
            },
            {
                label: "TypeScript",
                image: "https://www.typescriptlang.org/favicon.ico",
                url: "https://www.typescriptlang.org/",
            },
            {
                label: "PHP",
                image: "https://www.php.net/images/logos/php-logo.svg",
                url: "https://www.php.net/",
            },
        ],
    },
    {
        title: "Library & Framework",
        color: "gold",
        items: [
            {
                label: "React JS",
                image: "https://reactjs.org/favicon.ico",
                url: "https://reactjs.org/",
            },
            {
                label: "Next JS",
                image: "https://nextjs.org/static/favicon/favicon.ico",
                url: "https://nextjs.org/",
            },
            {
                label: "ViteJS",
                image: "https://vitejs.dev//logo.svg",
                url: "https://vitejs.dev/",
            },
            {
                label: "VueJS",
                image: "https://vuejs.org/logo.svg",
                url: "https://vuejs.org/",
            },
            {
                label: "NuxtJS",
                image: "https://v2.nuxt.com/_nuxt/icons/icon_64x64.6dcbd4.png",
                url: "https://nuxtjs.org/",
            },
            {
                label: "Bootstrap",
                image: "https://getbootstrap.com/docs/5.0/assets/img/favicons/apple-touch-icon.png",
                url: "https://getbootstrap.com/",
            },
            {
                label: "Ant Design",
                image: "https://gw.alipayobjects.com/zos/rmsportal/rlpTLlbMzTNYuZGGCVYM.png",
                url: "https://ant.design/",
            },
            {
                label: "Chakra UI",
                image: "https://chakra-ui.com/favicon.png",
                url: "https://chakra-ui.com/",
            },
            {
                label: "Material UI",
                image: "https://material-ui.com/favicon.ico",
                url: "https://material-ui.com/",
            },
            {
                label: "Tailwind CSS",
                image: "https://tailwindcss.com/favicons/favicon-32x32.png?v=3",
                url: "https://tailwindcss.com/",
            },
            {
                label: "Refine",
                image: "https://refine.dev/img/refine_favicon.svg",
                url: "https://refine.dev/",
                color: "black",
            },
            {
                label: "Mapbox GL JS",
                image: "https://www.mapbox.com/favicon.ico",
                url: "https://docs.mapbox.com/mapbox-gl-js/api/",
            },
            {
                label: "Leaflet JS",
                image: "https://leafletjs.com/docs/images/favicon.ico",
                url: "https://leafletjs.com/",
            },
            {
                label: "Turf JS",
                image: "https://turfjs.org/favicon.ico",
                url: "https://turfjs.org/",
            },
            {
                label: "OpenLayers",
                image: "https://openlayers.org/favicon.ico",
                url: "https://openlayers.org/",
            },
            {
                label: "Redux & Saga",
                image: "https://redux.js.org/img/redux.svg",
                url: "https://redux.js.org/",
            },
            {
                label: "Pinia",
                image: "https://pinia.vuejs.org/logo.svg",
                url: "https://pinia.vuejs.org/",
            },
            {
                label: "Zustand",
                image: "https://zustand-demo.pmnd.rs//favicon.ico",
                url: "https://zustand-demo.pmnd.rs/",
            },
            {
                label: "GraphQL",
                image: "https://graphql.org/favicon.ico",
                url: "https://graphql.org/",
            },
            {
                label: "JQuery",
                image: "https://jquery.com/favicon.ico",
                url: "https://jquery.com/",
            },
            {
                label: "IndexedDB",
                image: "https://developer.mozilla.org/static/media/mastodon.ef3a62906d984f615f00.svg",
                url: "https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API",
            },
        ],
    },
    {
        title: "Multiplatform App Development",
        color: "geekblue",
        items: [
            {
                label: "Dart",
                image: "https://dart.dev/assets/img/shared/dart/logo+text/horizontal/white.svg",
                url: "https://dart.dev/",
            },
            {
                label: "Flutter",
                image: "https://storage.googleapis.com/cms-storage-bucket/6a07d8a62f4308d2b854.svg",
                url: "https://flutter.dev/",
            },
            {
                label: "CapacitorJS",
                image: "https://capacitorjs.com/favicon.ico",
                url: "https://capacitorjs.com/",
            },
            {
                label: "ElectronJS",
                image: "https://www.electronjs.org//assets/img/favicon.ico",
                url: "https://www.electronjs.org/",
            },
        ],
    },
    {
        title: "Backend",
        color: "purple",
        items: [
            {
                label: "GO",
                image: "https://go.dev/images/go-logo-blue.svg",
                url: "https://go.dev/",
            },
            {
                label: "Laravel",
                image: "https://laravel.com/img/favicon/favicon-32x32.png",
                url: "https://laravel.com/docs/8.x/eloquent-resources",
            },
            {
                label: "NodeJS",
                image: "https://nodejs.org/favicon.ico",
                url: "https://nodejs.org/",
            },
            {
                label: "NestJS",
                image: "https://nestjs.com/favicon-32x32.0a29681d.png",
                url: "https://nestjs.com/",
            },
            {
                label: "ExpressJS",
                image: "https://expressjs.com/images/favicon.png",
                url: "https://expressjs.com/",
            },
            {
                label: "TypeORM",
                image: "https://typeorm.io/image/favicon/favicon-32x32.png",
                url: "https://typeorm.io/",
            },
            {
                label: "Geoserver",
                image: "https://geoserver.org/favicon.ico",
                url: "https://geoserver.org/",
            },
            {
                label: "Swagger",
                image: "https://static1.smartbear.co/swagger/media/assets/swagger_fav.png",
                url: "https://swagger.io/",
            },
        ],
    },
    {
        title: "Cloud & Storage",
        color: "lime",
        items: [
            {
                label: "Firebase",
                image: "https://firebase.google.com/favicon.ico",
                url: "https://firebase.google.com/",
            },
            {
                label: "MySQL",
                image: "https://upload.wikimedia.org/wikipedia/en/d/dd/MySQL_logo.svg",
                url: "https://www.mysql.com/",
            },
            {
                label: "PostgreSQL",
                image: "https://www.postgresql.org/favicon.ico",
                url: "https://www.postgresql.org/",
            },
            {
                label: "SQLite",
                image: "https://www.sqlite.org/favicon.ico",
                url: "https://www.sqlite.org/index.html",
            },

            {
                label: "Amazon S3",
                image: "https://aws.amazon.com/favicon.ico",
                url: "https://aws.amazon.com/s3/",
            },
        ],
    },
    {
        title: "Design",
        color: "cyan",
        items: [
            {
                label: "Inkscape",
                image: "https://media.inkscape.org/static/images/inkscape-favicon.png",
                url: "https://inkscape.org/",
            },
            {
                label: "Canva",
                image: "https://static.canva.com/static/images/favicon.ico",
                url: "https://www.canva.com/",
            },
            {
                label: "Figma",
                image: "https://static.figma.com/app/icon/1/favicon.svg",
                url: "https://www.figma.com/",
            },
        ],
    },
    {
        title: "Miscellaneous",
        color: "default",
        text_color: "dimgray",
        items: [
            {
                label: "Google Apps Script",
                image: "https://script.google.com/favicon.ico",
                url: "https://developers.google.com/apps-script",
            },
            {
                label: "🐶 Husky",
                // image: "",
                url: "https://typicode.github.io/husky/",
            },
            {
                label: "Bubblewrap",
                icon: SettingOutlined,
                url: "https://github.com/GoogleChromeLabs/bubblewrap",
            },
            {
                label: "Keycloak",
                image: "https://www.keycloak.org/resources/images/icon.svg",
                url: "https://www.keycloak.org/",
            },
            {
                label: "Google Cardboard",
                image: "https://arvr.google.com//cardboard/images/favicon/vr/favicon-32x32.png",
                url: "https://arvr.google.com/cardboard/",
            },
            {
                label: "Unity",
                image: "https://unity.com/favicon.ico",
                url: "https://unity.com/",
            },
            {
                label: "Vuforia Engine",
                image: "https://developer.vuforia.com/images/favicon.ico",
                url: "https://developer.vuforia.com/",
            },
            {
                label: "JUnit",
                image: "https://junit.org/junit5/assets/img/junit5-logo.png",
                url: "https://junit.org/junit5/",
            },
            {
                label: "Selenium",
                image: "https://www.selenium.dev/favicons/favicon-16x16.png",
                url: "https://www.selenium.dev/",
            },
            {
                label: "Cucumber",
                image: "https://cucumber.io/cucumber/assets/img/favicon.png",
                url: "https://cucumber.io/",
            },
        ],
    },
];
