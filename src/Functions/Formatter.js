export function formatAnnotation(annotation, name, dc) {
    annotation = annotation.replace("%s", name);
    annotation = annotation.replace("%d", dc);
    return annotation;
}

export function formatedUrl(url){
    if (process.env.NODE_ENV !== 'test') {
        url = `${process.env.REACT_APP_QUESTION_DOMAIN}${url}`
    }
    return url;
}