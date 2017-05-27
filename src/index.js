/*
 * error-reporter
 * https://github.com/sproogen/error-reporter
 * by James Grant
 */

/*
 * Render an error element in the error container
 *
 * @param string errorText    The error text
 * @param string errorDetails The error details
 */
const showError = (errorText, errorDetails) => {
    var errorElement = document.createElement('div')
    errorElement.setAttribute('class', 'error')

    var closeElement = document.createElement('a')
    closeElement.setAttribute('class', 'button')
    closeElement.innerHTML = 'x'
    closeElement.onclick = function() {
        errorElement.parentNode.removeChild(errorElement);
    }
    errorElement.appendChild(closeElement)

    var errorTextElement = document.createElement('div')
    errorTextElement.setAttribute('class', 'errorText')
    errorTextElement.innerHTML = errorText
    errorElement.appendChild(errorTextElement)

    var errorDetailsElement = document.createElement('div')
    errorDetailsElement.setAttribute('class', 'errorText')
    errorDetailsElement.innerHTML = errorDetails
    errorElement.appendChild(errorDetailsElement)

    document.getElementById("error-container").appendChild(errorElement)
}

/*
 * Inset the CSS into the header
 */
const insertCSS = () => {
    /*
     * Sorry about incuding the CSS like this. Was just trying to keep it simple instead of compiling it through webpack.
     */
    const css = '#error-container{position:fixed;z-index:999999;bottom:0;right:0;width:100%;box-sizing:border-box;font-family:"Helvetica Neue",Helvetica,Arial,sans-serif}.error{width:96%;margin:10px auto;box-sizing:border-box;background-color:#505050;color:#fff;padding:15px;border-radius:3px;opacity:.8;-webkit-animation:fadein .5s;animation:fadein .5s}.errorDetails{font-size:.9em}.button{padding:0;cursor:pointer;background:0 0;border:0;-webkit-appearance:none;position:relative;right:-.3em;top:-.3em;float:right;font-size:20px;font-weight:700;color:#fff;text-decoration:none}@-webkit-keyframes fadein{from{margin-bottom:-40px;opacity:0}to{margin-bottom:10px;opacity:0.8}}@keyframes fadein{from{margin-bottom:-40px;opacity:0}to{margin-bottom:10px;opacity:0.8}}'
    var head = document.head || document.getElementsByTagName('head')[0]
    var style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet){
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
}

/*
 * Inset the error container at the end on the body
 */
const insertContainer = () => {
    var body = document.body || document.getElementsByTagName('body')[0]
    var errorContainer = document.createElement('div')
    errorContainer.setAttribute('id', 'error-container');
    body.appendChild(errorContainer);
}

/*
 * Window event listener to listen for error events
 */
window.addEventListener('error', function (event) {
    const messageParts = event.message.split(': ')
    var errorText    = ''
    var errorDetails = null
    var stacktrace   = false

    if (messageParts.length === 2) {
        const errorType = messageParts[0].split(' ').pop()
        errorText = 'Detected ' + errorType
        errorDetails = '\'' + messageParts[1] + '\' at ' + event.filename + ':' + event.lineno + ':' + event.colno
        stacktrace  = event.error.stack
    } else {
        errorText = 'Detected ' + event.message
    }

    showError(errorText, errorDetails)

    if (stacktrace) {
        console.log(stacktrace)
    } else {
        console.log(errorText)
    }

    event.preventDefault()
})

/*
 * Set up on window load
 */
window.onload = () => {
    insertContainer()
    insertCSS()
}