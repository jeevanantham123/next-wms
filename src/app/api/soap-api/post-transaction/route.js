// pages/api/soapRequest.js

import axios from "axios";
import xml2js from "xml2js";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  let siteValue = "";
  let stockList = [];
  await req
    .json()
    .then((data) => {
      siteValue = data.siteValue;
      stockList = data.stockList;
    })
    .catch((err) => {
      return NextResponse.json(
        {
          success: false,
          error: error.message || "SOAP request failed",
        },
        { status: 500 }
      );
    });
  if (!stockList.length) return;

  const xmlFormatStockList = stockList.map((item) => ({
    ZITMREF: item.productId,
    ZPCU: item.UOM,
    ZQTY: item.quantity.toString(),
    ZSTA: item.currentStatus,
    ZLOC: item.loc,
    ZDESTLOC: item.destinationStatus || "", //FIXME: Default empty if not available
    ZSTADEST: item.destinationStatus || "", //FIXME Default empty if not available
    ZLOT: item.lot || "", //FIXME Default empty if not available
    ZSUBLOT: "", //FIXME No corresponding field in original, set as empty
  }));
  const soapEnvelope = `
      <soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wss="http://www.adonix.com/WSS">
          <soapenv:Header/>
          <soapenv:Body>
          <wss:run soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
          <callContext xsi:type="wss:CAdxCallContext">
          <codeLang xsi:type="xsd:string">ENG</codeLang>
          <poolAlias xsi:type="xsd:string">GITINT</poolAlias>
          <poolId xsi:type="xsd:string"></poolId>
          <requestConfig xsi:type="xsd:string">adxwss.beautify=true</requestConfig>
          </callContext>
          <publicName xsi:type="xsd:string">ZSTKCR</publicName>
          <inputXml xsi:type="xsd:string">
          {
          "GRP1":{"ZSTOFCY":${siteValue}},
          "GRP2":${xmlFormatStockList}
          }

          </inputXml>
          </wss:run>
          </soapenv:Body>
      </soapenv:Envelope>
    `;

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

    console.log("Post transaction completed", response?.data);

    return NextResponse.json({
      success: true,
      data: {
        transactionId: 1234, //FIXME: Transaction ID should be decoded from XML response
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
