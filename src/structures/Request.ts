import fetch from "cross-fetch";
import { AutoModerationActionObject, IError } from "../typings";
interface RequestOptions {
  method: "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
  endpoint: string;
  data?: any;
}
/**
 * @see https://www.geeksforgeeks.org/http-headers-content-type/ for header list
 */
export enum ApplicationType {
  EDIX12 = "application/EDI-X12",
  Javascript = "application/javascript",
  OctetStream = "application/octet-stream",
  OGG = "application/ogg",
  PDF = "application/pdf",
  XHTML_XML = "application/xhtml+xml",
  XShockwaveFlash = "application/x-shockwave-flash",
  JSON = "application/json",
  ldJSON = "application/ld+json",
  XML = "application/xml",
  Zip = "application/zip",
  XWWWFormUrlencoded = "application/x-www-form-urlencoded",
}
/**
 * @see https://www.geeksforgeeks.org/http-headers-content-type/ for header list
 */
export enum AudioType {
  MPEG = "audio/mpeg",
  XMSWMA = "audio/x-ms-wma",
  VND_RNRealAudio = "audio/vnd.rn-realaudio",
  XWav = "audio/x-wav",
}
/**
 * @see https://www.geeksforgeeks.org/http-headers-content-type/ for header list
 */
export enum ImageType {
  GIF = "image/gif",
  JPEG = "image/jpeg",
  PNG = "image/png",
  TIFF = "image/tiff",
  VND_Microsoft_icon = "image/vnd.microsoft.icon",
  XIcon = "image/x-icon",
  VND_djvu = "image/vnd.djvu",
  SVG_XML = "image/svg+xml",
}
/**
 * @see https://www.geeksforgeeks.org/http-headers-content-type/ for header list
 */
export enum MultiType {
  Mixed = "multipart/mixed",
  Alternative = "multipart/alternative",
  Related = "multipart/related",
  FormData = "multipart/form-data",
}
/**
 * @see https://www.geeksforgeeks.org/http-headers-content-type/ for header list
 */
export enum TextType {
  CSS = "text/css",
  HTML = "text/html",
  Javascript = "text/javascript",
  Plain = "text/plain",
  XML = "text/xml",
}
/**
 * @see https://www.geeksforgeeks.org/http-headers-content-type/ for header list
 */
export enum VideoType {
  MPEG = "video/mpeg",
  MP4 = "video/mp4",
  QuickTime = "video/quicktime",
  XMSWMV = "video/x-ms-wmv",
  XMSVideo = "video/x-msvideo",
  XFLV = "video/x-flv",
  WEBM = "video/webm",
}
/**
 * @see https://www.geeksforgeeks.org/http-headers-content-type/ for header list
 */
export enum VNDType {
  VND_oasis_opendocument_text = "application/vnd.oasis.opendocument.text",
  VND_oasis_opendocument_spreadsheet = "application/vnd.oasis.opendocument.spreadsheet",
  VND_oasis_opendocument_presentation = "application/vnd.oasis.opendocument.presentation",
  VND_oasis_opendocument_graphics = "application/vnd.oasis.opendocument.graphics",
  VND_MSExcel = "application/vnd.ms-excel",
  VND_openxmlformatsOfficedocument_spreadsheetml_sheet = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  VND_MSPowerpoint = "application/vnd.ms-powerpoint",
  VND_openxmlformatsOfficedocument_presentationml_presentation = "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  MSWord = "application/msword",
  VND_openxmlformatsOfficedocument_wordprocessingml_document = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  VND_mozilla_xulXML = "application/vnd.mozilla.xul+xml",
}
/**
 * @see https://www.geeksforgeeks.org/http-headers-content-type/ for header list
 */
export type X_Audit_Log_Reason = "X-Audit-Log-Reason";

export class Request {
  public api: string;
  private token: string;
  constructor(token: string) {
    this.token = token;
    this.api = "https://discord.com/api/v10";
  }
  public async req<T>(
    opts: RequestOptions,
    type:
      | ApplicationType
      | AudioType
      | ImageType
      | MultiType
      | TextType
      | VideoType
      | VNDType
      | X_Audit_Log_Reason
  ): Promise<T | IError> {
    const request: Object = {
      method: opts.method,
      headers: {
        "Content-Type": `${type}`,
        Authorization: `Bot ${this.token}`,
      },
    };
    const data: Object = opts.data ? JSON.stringify(opts.data) : {};

    if (opts.method !== "GET") {
      if (opts.method !== "DELETE") {
        request["body"] = data;
      }
    }
    return new Promise(async (resolve, reject) => {
      return await fetch(this.api + opts.endpoint, request).then((x) => {
        x.json()
          .then((res) => {
            return resolve(res);
          })
          .catch(() => {
            resolve(null);
          });
      });
    });
  }
}
