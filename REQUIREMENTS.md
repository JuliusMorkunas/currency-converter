## TransferGo
### Technical task for frontend developers

---

Create a currency converter widget that uses TransferGo API endpoint for FX rates.

Acceptance criteria for the widget:

* Written using ES6+, React, Redux.

* Uses TransferGo API for FX rates (details below).

* Allows user to select FROM currency, TO currency and AMOUNT to convert.

* Has a button for initial conversion.

* After conversion, AMOUNT, CONVERTED AMOUNT, and FX RATE should be displayed.

* After initial conversion using the button, the following conversions should be automatic - converted amount should be calculated when new amount is entered.

* Design should be as close to [design mock-up](https://tg-static-assets.s3-eu-west-1.amazonaws.com/interview-tasks/front-end/currency-converter.png) as possible.

* Detailed README file included with information about how to run the tests and start the app.



FX rates endpoint: GET `https://my.transfergo.com/api/fx-rates` with following parameters:

- `from` (3-lettered currency),

- `to` (3-lettered currency),

- `amount` (float number).


Please provide a link to a repository with your solution.

Good luck!
