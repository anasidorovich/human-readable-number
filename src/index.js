module.exports = function toReadable(number) {
    return toWords(number);
}

var largeNumbersNames = ['', 'thousand', 'million', 'billion', 'trillion'];
var beforeTenNumbersNames = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
var beforeTwentyNumbersNames = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
var tensNumbersNames = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

function toWords(str) {
    str = str.toString().replace(/[\, ]/g, '');
    var length = str.length;
    if (str == '0') {
        return 'zero';
    }
    var numberAsCharsArray = str.split('');
    var words = '';
    var largeNum = 0;
    for (var i = 0; i < length; i++) {
        if ((length - i) % 3 == 2) {
            if (numberAsCharsArray[i] == '1') {
                words += beforeTwentyNumbersNames[Number(numberAsCharsArray[i + 1])] + ' ';
                i++;
                largeNum = 1;
            } else if (numberAsCharsArray[i] != 0) {
                words += tensNumbersNames[numberAsCharsArray[i] - 2] + ' ';
                largeNum = 1;
            }
        } else if (numberAsCharsArray[i] != 0) {
            words += beforeTenNumbersNames[numberAsCharsArray[i]] + ' ';
            if ((length - i) % 3 == 0)
                words += 'hundred ';
            largeNum = 1;
        }
        if ((length - i) % 3 == 1) {
            if (largeNum)
                words += largeNumbersNames[(length - i - 1) / 3] + ' ';
            largeNum = 0;
        }
    }
    return words.replace(/\s+/g, ' ').trim();
}
