declare module "szamlazz.js" {
  export class Client {
    constructor(options: {
      user?: string
      password?: string
      authToken?: string
      eInvoice?: boolean
      requestInvoiceDownload?: boolean
      downloadedInvoiceCount?: number
      responseVersion?: number
      timeout?: number
    })

    getInvoiceData(options: {
      invoiceId?: string
      orderNumber?: string
      pdf?: boolean
    }): Promise<InvoiceData>

    reverseInvoice(options: {
      invoiceId: string
      eInvoice: boolean
      requestInvoiceDownload: boolean
    }): Promise<ReverseInvoiceResult>

    issueInvoice(invoice: Invoice): Promise<IssueInvoiceResult>

    setRequestInvoiceDownload(value: boolean): void
  }

  export class Buyer {
    constructor(options: {
      name: string
      zip: string
      city: string
      address: string
      country?: string
      email?: string
      sendEmail?: boolean
      taxSubject?: TaxSubject
      taxNumber?: string
      taxNumberEU?: string
      postAddress?: {
        name?: string
        country?: string
        zip?: string
        city?: string
        address?: string
      }
      identifier?: string
      issuerName?: string
      phone?: string
      comment?: string
    })

    _generateXML(indentLevel?: number): string
  }

  export class Currency {
    constructor(value: string, roundPriceExp: number, comment: string)
    toString(): string
  }

  export class Language {
    constructor(value: string, name: string)
    toString(): string
  }

  export class PaymentMethod {
    constructor(value: string, comment: string)
    toString(): string
  }

  export class TaxSubject {
    constructor(value: number, comment: string)
    toString(): string
  }

  export const Currencies: {
    [key: string]: Currency
  }

  export const Languages: {
    [key: string]: Language
  }

  export const PaymentMethods: {
    [key: string]: PaymentMethod
  }

  export const TaxSubjects: {
    [key: string]: TaxSubject
  }

  export class Invoice {
    constructor(options: {
      issueDate?: Date
      fulfillmentDate?: Date
      dueDate?: Date
      paymentMethod?: PaymentMethod
      currency?: Currency
      language?: Language
      exchangeRate?: number
      exchangeBank?: string
      seller?: Seller
      buyer: Buyer
      items: Item[]
      orderNumber?: string
      proforma?: boolean
      invoiceIdPrefix?: string
      paid?: boolean
      comment?: string
      logoImage?: string
      prepaymentInvoice?: boolean
    })

    _generateXML(indentLevel?: number): string
  }

  export class Item {
    constructor(options: {
      label: string
      quantity: number
      vat: number | string
      netUnitPrice?: number
      grossUnitPrice?: number
      unit?: string
      comment?: string
    })

    _generateXML(indentLevel: number, currency: Currency): string
  }

  export class Seller {
    constructor(options: {
      bank?: {
        name?: string
        accountNumber?: string
      }
      email?: {
        replyToAddress?: string
        subject?: string
        message?: string
      }
      issuerName?: string
    })

    _generateXML(indentLevel?: number): string
  }

  export function wrapWithElement(
    name: string | string[][],
    data: string | number | boolean | Date | string[][] | number[][] | boolean[][],
    indentLevel?: number
  ): string

  export function parseString(xml: string): Promise<XMLObject>

  export function xml2obj(
    xml: string,
    objList: { [key: string]: string }
  ): Promise<{ [key: string]: string | number | boolean | Date | string[] | number[] | boolean[] }>

  export function xml2obj(
    xml: string,
    objList: { [key: string]: string }
  ): Promise<{ [key: string]: any }>

  export interface InvoiceData {
    // Define the properties of the invoice data
  }

  export interface ReverseInvoiceResult {
    // Define the properties of the reverse invoice result
  }

  export interface IssueInvoiceResult {
    // Define the properties of the issue invoice result
  }

  export interface XMLObject {
    // Define the properties of the XML object
  }
}
