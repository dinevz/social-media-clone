export default function postContentShortener(content) {
    let regex = new RegExp('.{' + 42 + '}|.{1,' + Number(42-1) + '}', 'g');
    return content.match(regex);
}