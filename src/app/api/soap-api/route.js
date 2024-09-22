// pages/api/soapRequest.js

import axios from "axios";
import xml2js from "xml2js";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  const soapEnvelope = `
    <soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                      xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
                      xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
                      xmlns:wss="http://www.adonix.com/WSS">
      <soapenv:Header/>
      <soapenv:Body>
        <wss:run soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
          <callContext xsi:type="wss:CAdxCallContext">
            <codeLang xsi:type="xsd:string">ENG</codeLang>
            <poolAlias xsi:type="xsd:string">GITAPP</poolAlias>
            <poolId xsi:type="xsd:string"></poolId>
            <requestConfig xsi:type="xsd:string">adxwss.beautify=true</requestConfig>
          </callContext>
          <publicName xsi:type="xsd:string">ZSTKRD</publicName>
          <inputXml xsi:type="xsd:string">
            {
              "GRP1": {
                "ZITMREF": "BMS008", 
                "ZLOT": "",
                "ZLPN": "",
                "ZLOC": "A2C11",
                "ZFCY": "",
                "ZCPY": ""
              }
            }
          </inputXml>
        </wss:run>
      </soapenv:Body>
    </soapenv:Envelope>
  `;

  // "ZITMREF": "BMS008",
  // "ZLOC": "A2C11",

  const username = "admin";
  const password = "-JK-p1ht29O=7'S";

  try {
    const response = await axios.post(
      "http://sagex3v12.germinit.com:8124/soap-generic/syracuse/collaboration/syracuse/CAdxWebServiceXmlCC",
      soapEnvelope,
      {
        headers: {
          "Content-Type": "text/xml",
          soapaction: "*",
        },
        auth: { username, password },
      }
    );

    const parsedResponse = await xml2js.parseStringPromise(response.data, {
      explicitArray: false,
    });

    const resultXmlString =
      parsedResponse["soapenv:Envelope"]?.["soapenv:Body"]?.[
        "wss:runResponse"
      ]?.["runReturn"]?.["resultXml"]?._;

    if (!resultXmlString) {
      throw new Error("Unable to find resultXml in SOAP response");
    }

    const parsedResultXml = await xml2js.parseStringPromise(resultXmlString, {
      explicitArray: false,
    });

    const extractFields = (fields) =>
      (Array.isArray(fields) ? fields : [fields]).map((field) => ({
        name: field.$.NAME,
        type: field.$.TYPE,
        value: field._ || "",
      }));

    const group1Data = extractFields(parsedResultXml.RESULT?.GRP?.FLD);

    const linFields = parsedResultXml.RESULT?.TAB?.LIN || [];

    // Extract Table 2 Line Data
    const table2LineData = Array.isArray(linFields) ? linFields : [linFields];

    const formattedTable2LineData = table2LineData.map((lin) => ({
      id: lin.FLD.find((field) => field.$.NAME === "ID")?._ || "",
      productId: lin.FLD.find((field) => field.$.NAME === "ZITMREF1")?._ || "",
      lot: lin.FLD.find((field) => field.$.NAME === "ZLOT1")?._ || "",
      expiryDate: lin.FLD.find((field) => field.$.NAME === "ZEXPDT")?._ || "",
      lpn: lin.FLD.find((field) => field.$.NAME === "ZLPN1")?._ || "",
      quantity: parseInt(
        lin.FLD.find((field) => field.$.NAME === "ZQTY")?._ || "0"
      ),
      UOM: lin.FLD.find((field) => field.$.NAME === "ZPCU")?._ || "",
      currentStatus: lin.FLD.find((field) => field.$.NAME === "ZSTA")?._ || "",
      destinationStatus:
        lin.FLD.find((field) => field.$.NAME === "ZSTADEST")?._ || "",
      loc: lin.FLD.find((field) => field.$.NAME === "ZLOC1")?._ || "",
      packingQuantity: 50, // Replace with actual logic if needed
      packingUnit: "box", // Replace with actual logic if needed
    }));

    return NextResponse.json({
      success: true,
      data: {
        tableHeader: group1Data,
        tableData: formattedTable2LineData,
      },
    });
  } catch (error) {
    console.error("SOAP request failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "SOAP request failed",
      },
      { status: 500 }
    );
  }
}
