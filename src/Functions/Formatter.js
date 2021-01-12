export default function formatAnnotation(annotation, name, dc) {
    annotation = annotation.replace("%s", name);
    annotation = annotation.replace("%d", dc);
    return annotation;
}