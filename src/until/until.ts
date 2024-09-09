export const formatSalary = (value: string | number | undefined) => {
    if (!value) return 'N/A';
    return parseInt(value.toString()).toLocaleString('vi-VN');
};


export const SKILLS_LIST =
    [
        { label: "React.JS", value: "REACT.JS" },
        { label: "React Native", value: "REACT NATIVE" },
        { label: "Vue.JS", value: "VUE.JS" },
        { label: "Angular", value: "ANGULAR" },
        { label: "Nest.JS", value: "NEST.JS" },
        { label: "TypeScript", value: "TYPESCRIPT" },
        { label: "Java", value: "JAVA" },
        { label: "Frontend", value: "FRONTEND" },
        { label: "Backend", value: "BACKEND" },
        { label: "Fullstack", value: "FULLSTACK" }
    ];