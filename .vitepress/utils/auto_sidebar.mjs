import path from "node:path";
import fs from "node:fs";

const DIR_PATH = path.resolve();
const WHITE_LIST = [
    ".vitepress",
    "node_modules",
    ".idea",
    "assets",
    "images",
];

const DIR_NAME_MAP = {
    'getting-started': '入门指南',
    'advanced-projects': '进阶项目',
    'resources': '资源下载',
    'esp32s3': 'ESP32S3 开发',
    'esp32s3/beginner': '初级教程',
    'esp32s3/intermediate': '中级教程',
    'esp32s3/advanced': '高级教程',
    'solidworks': 'SolidWorks',
    'solidworks/beginner': '初级教程',
    'solidworks/intermediate': '中级教程',
    'solidworks/advanced': '高级教程',
    'beginner': '初级教程',
    'intermediate': '中级教程',
    'advanced': '高级教程'
};

const isDirectory = (path) => fs.lstatSync(path).isDirectory();

const intersections = (arr1, arr2) =>
    Array.from(new Set(arr1.filter((item) => !new Set(arr2).has(item))));

const getMarkdownTitle = (filePath) => {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const match = content.match(/^#\s+(.+)/m);
        if (match) {
            return match[1].trim();
        }
    } catch (e) {
        console.warn(`无法读取文件标题: ${filePath}`);
    }
    return null;
};

// 把方法导出直接使用
function getList(params, path1, pathname) {
    // 存放结果
    const res = [];
    // 开始遍历params
    for (let file in params) {
        // 拼接目录
        const dir = path.join(path1, params[file]);
        // 判断是否是文件夹
        const isDir = isDirectory(dir);
        if (isDir) {
            // 如果是文件夹,读取之后作为下一次递归参数
            const files = fs.readdirSync(dir);
            res.push({
                text: params[file],
                collapsible: true,
                items: getList(files, dir, `${pathname}/${params[file]}`),
            });
        } else {
            const name = path.basename(params[file]);
            const suffix = path.extname(params[file]);
            if (suffix !== ".md") {
                continue;
            }
            const filePath = path.join(path1, params[file]);
            const title = getMarkdownTitle(filePath);
            res.push({
                text: title || name,
                link: `${pathname}/${name}`,
            });
        }
    }
    // 对name做一下处理，把后缀删除
    res.map((item) => {
        item.text = item.text.replace(/\.md$/, "");
    });
    return res;
}

export const set_sidebar = (pathname) => {
    const dirPath = path.join(DIR_PATH, pathname);
    const files = fs.readdirSync(dirPath);
    const items = intersections(files, WHITE_LIST);
    const listItems = getList(items, dirPath, pathname);
    const label = DIR_NAME_MAP[pathname] || pathname;
    return [{
        text: label,
        items: listItems
    }];
};