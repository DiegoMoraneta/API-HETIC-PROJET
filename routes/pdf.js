const express = require('express');
const router = express.Router();
const PDFDocument = require('./pdfkit-tables');
var sql = require("mssql");
var conn = require("../connection/connect")();

// GET request to /pdf simplified without any data to check if my post is not working, this works
/*router.post('/', (req, res) => {
  const PDFDocument = require('./pdfkit-tables');
  const doc = new PDFDocument({ layout: 'landscape' });

  let filename = 'complex_test.pdf';
  res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
  res.setHeader('Content-type', 'application/pdf');

  // Adding a title
  doc.fontSize(18).text('PDF Generation Test', 100, 50);

  // Adding some dynamic-like text
  doc.fontSize(12).moveDown();
  for (let i = 1; i <= 5; i++) {
      doc.text(`Line ${i}: This is a test line.`, 100, doc.y);
  }

  // Adding a simple table
  const table = {
      headers: ['Column 1', 'Column 2', 'Column 3'],
      rows: [
          ['Row 1', 'Data 1', 'Example 1'],
          ['Row 2', 'Data 2', 'Example 2'],
          ['Row 3', 'Data 3', 'Example 3'],
      ],
  };
  doc.moveDown().table(table, 100, doc.y, { width: 490 });

  doc.pipe(res);
  doc.end();
});
*/



/*
router.post('/', (req, res) => {
  console.log('Received POST request to /pdf');
  const doc = new PDFDocument({
    layout: 'landscape',
  });

  let filename = req.body.filename;
  console.log('Filename:', filename);
  // Stripping special characters
  filename = encodeURIComponent(filename) + '.pdf';
  console.log('Stripped filename:', filename);
  // Setting response to 'attachment' (download).
  res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
  res.setHeader('Content-type', 'application/pdf');
  const content = req.body.content;

  // Variables for the query (You need to change these according to your input)
  const COMPANY_NAME = req.body.company; // Empresa -> COMPANY_NAME
  const MEETING_ID = req.body.meeting; // Junta -> MEETING_ID
  const START_DATE = `${req.body.start_date}`; // Start Date
  const END_DATE = `${req.body.end_date}`; // End Date

      console.log('COMPANY_NAME:', COMPANY_NAME);
    console.log('MEETING_ID:', MEETING_ID);
    console.log('START_DATE:', START_DATE);
    console.log('END_DATE:', END_DATE);

  // Query to select meeting description
  var sqlQueryMeeting = `SELECT DESCRIPTION
                         FROM dbo.JTA_JUNTAS
                         WHERE JUNT_ID = ${MEETING_ID}`;
  console.log('SQL query for meeting:', sqlQueryMeeting);
  // Query for proxy report
  var sqlQueryProxyReport = `...`; // The actual SQL query remains unchanged

  // Query for shareholder report
  var sqlQueryShareholderReport = `...`; // The actual SQL query remains unchanged

  // Function to get meeting information
  function getMeetings(callback) {
    console.log('Connecting to database to fetch meeting information...');
    conn.connect().then(function () {
      var req = new sql.Request(conn);
      req.query(sqlQueryMeeting).then(function (recordset) {
        conn.close();
        callback(recordset.recordset);
      })
      .catch(function (err) {
        conn.close();
        console.log("Error fetching meeting information:", err);
      });
    })
    .catch(function (err) {
      conn.close();
      console.log("Connection error");
    });
  }

  // Function to get proxy report
  function getProxyReport(callback) {
    conn.connect().then(function () {
      console.log('Connecting to database to fetch meeting information...');
      var req = new sql.Request(conn);
      req.query(sqlQueryProxyReport).then(function (recordset) {
        conn.close();
        callback(recordset.recordset);
      })
      .catch(function (err) {
        conn.close();
        console.log("Error fetching meeting information:", err);
      });
    })
    .catch(function (err) {
      conn.close();
      console.log("Connection error");
    });
  }

  // Function to get shareholder report
  function getShareholderReport(callback) {
    console.log('Connecting to database to fetch meeting information...');
    conn.connect().then(function () {
      var req = new sql.Request(conn);
      req.query(sqlQueryShareholderReport).then(function (recordset) {
        conn.close();
        callback(recordset.recordset);
      })
      .catch(function (err) {
        conn.close();
        console.log("Error fetching meeting information:", err);
      });
    })
    .catch(function (err) {
      conn.close();
      console.log("Connection error");
    });
  }

  // Example of preparing data for a table in the PDF document
  // Note: You need to adjust according to your data processing and structure
  const table0 = {
    headers: ['Column1', 'Column2', 'Column3'], // Example headers
    rows: [],
  };

  getMeetings(function (meeting) {
    getProxyReport(function (proxyReport) {
      getShareholderReport(function (shareholderReport) {
        const date = new Date();


        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();

        var time = `Time: ${hours}:${minutes}:${seconds}`;
        var dateStr = `Date: ${date.toLocaleDateString()}`;
        var temp = [];
        var MEETING = `Meeting: ${meeting[0].DESCRIPTION}`;
        var COMPANY = `Company: ${COMPANY_NAME}`

        // Preparing variables to obtain totals
        let actions = 0;
        let totalActions = 0;
        let proxies = new Set();
        let shareholders = new Set();
        count = 1;

        proxyReport.forEach(element => {
          temp.push([count, element.DV, element.PROXY, element.PROXY_ID,
            element.SHAREHOLDER, element.SHAREHOLDER_ID, element.SERIES,
            element.ACTIONS, element.TOTAL
          ]);

          actions = actions + element.ACTIONS;
          totalActions = totalActions + element.TOTAL;
          if (!proxies.has(element.PROXY)) {
            proxies.add(element.PROXY);
          }
          if (!shareholders.has(element.SHAREHOLDER)) {
            shareholders.add(element.SHAREHOLDER);
          }

          count++;
        });

        shareholderReport.forEach(element => {
          totalActions = totalActions + element.TOTAL;
          if (!shareholders.has(element.SHAREHOLDER[0])) {
            temp.push([count, element.DV, '-', '-', element.SHAREHOLDER[0],
              element.SHAREHOLDER_ID[0], element.SERIES,
              element.TOTAL_ACTIONS, element.TOTAL
            ]);
            actions = actions + element.TOTAL_ACTIONS;
            totalActions = totalActions + element.TOTAL;
            shareholders.add(element.SHAREHOLDER[0]);
            count++;
          }
        });

        table0.rows = temp;

        // Scale the image
        doc.image('public/images/descarga.jpg', 30, 30, {
          scale: 0.25
        })

        doc.fontSize(8).text(time, 690, 50, {
          width: 70,
          align: 'right'
        });
        doc.fontSize(8).text(dateStr, 690, 60, {
          width: 70,
          align: 'right'
        });

        doc.fontSize(8).text(COMPANY, 30, 80, {
          align: 'left'
        });

        doc.fontSize(8).text(MEETING, 30, 90, {
          align: 'left'
        });

        doc.fontSize(12).text(content.toUpperCase(), 300, 80, {
          width: 200,
          align: 'center'
        });

        doc.moveDown().table(table0, {
          prepareHeader: () => doc.font('Helvetica-Bold').fontSize(8),
          prepareRow: (row, i) => doc.font('Helvetica').fontSize(6)
        });

        let totalProxiesInfo = `${proxies.size}`
        let totalShareholdersInfo = `${shareholders.size}`
        let actionsInfo = `${actions}`;
        let totalActionsInfo = `${totalActions}`

        doc.font('Helvetica').fontSize(10);
        doc.text('Total Proxies: ', 60, 520, {
          width: 130,
          align: 'left'
        });
        doc.text(totalProxiesInfo, 200, 520, {
          width: 100,
          align: 'right'
        });

        doc.text('Total Shareholders: ', 60, 530, {
          width: 130,
          align: 'left'
        });
        doc.text(totalShareholdersInfo, 200, 530, {
          width: 100,
          align: 'right'
        });

        doc.text('Actions: ', 60, 540, {
          width: 130,
          align: 'left'
        });
        doc.text(actionsInfo, 200, 540, {
          width: 100,
          align: 'right'
        });

        doc.text('Total General Actions: ', 60, 550, {
          width: 140,
          align: 'left'
        });
        doc.text(totalActionsInfo, 200, 550, {
          width: 100,
          align: 'right'
        });

        doc.rect(50, 510, 260, 60).stroke().opacity(0.7);



        doc.pipe(res)

        doc.end()
      })
    })
  })
})*/



module.exports = router
