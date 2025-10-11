/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export type HttpStatus =
  | "100 CONTINUE"
  | "101 SWITCHING_PROTOCOLS"
  | "102 PROCESSING"
  | "103 EARLY_HINTS"
  | "103 CHECKPOINT"
  | "200 OK"
  | "201 CREATED"
  | "202 ACCEPTED"
  | "203 NON_AUTHORITATIVE_INFORMATION"
  | "204 NO_CONTENT"
  | "205 RESET_CONTENT"
  | "206 PARTIAL_CONTENT"
  | "207 MULTI_STATUS"
  | "208 ALREADY_REPORTED"
  | "226 IM_USED"
  | "300 MULTIPLE_CHOICES"
  | "301 MOVED_PERMANENTLY"
  | "302 FOUND"
  | "302 MOVED_TEMPORARILY"
  | "303 SEE_OTHER"
  | "304 NOT_MODIFIED"
  | "305 USE_PROXY"
  | "307 TEMPORARY_REDIRECT"
  | "308 PERMANENT_REDIRECT"
  | "400 BAD_REQUEST"
  | "401 UNAUTHORIZED"
  | "402 PAYMENT_REQUIRED"
  | "403 FORBIDDEN"
  | "404 NOT_FOUND"
  | "405 METHOD_NOT_ALLOWED"
  | "406 NOT_ACCEPTABLE"
  | "407 PROXY_AUTHENTICATION_REQUIRED"
  | "408 REQUEST_TIMEOUT"
  | "409 CONFLICT"
  | "410 GONE"
  | "411 LENGTH_REQUIRED"
  | "412 PRECONDITION_FAILED"
  | "413 PAYLOAD_TOO_LARGE"
  | "413 REQUEST_ENTITY_TOO_LARGE"
  | "414 URI_TOO_LONG"
  | "414 REQUEST_URI_TOO_LONG"
  | "415 UNSUPPORTED_MEDIA_TYPE"
  | "416 REQUESTED_RANGE_NOT_SATISFIABLE"
  | "417 EXPECTATION_FAILED"
  | "418 I_AM_A_TEAPOT"
  | "419 INSUFFICIENT_SPACE_ON_RESOURCE"
  | "420 METHOD_FAILURE"
  | "421 DESTINATION_LOCKED"
  | "422 UNPROCESSABLE_ENTITY"
  | "423 LOCKED"
  | "424 FAILED_DEPENDENCY"
  | "425 TOO_EARLY"
  | "426 UPGRADE_REQUIRED"
  | "428 PRECONDITION_REQUIRED"
  | "429 TOO_MANY_REQUESTS"
  | "431 REQUEST_HEADER_FIELDS_TOO_LARGE"
  | "451 UNAVAILABLE_FOR_LEGAL_REASONS"
  | "500 INTERNAL_SERVER_ERROR"
  | "501 NOT_IMPLEMENTED"
  | "502 BAD_GATEWAY"
  | "503 SERVICE_UNAVAILABLE"
  | "504 GATEWAY_TIMEOUT"
  | "505 HTTP_VERSION_NOT_SUPPORTED"
  | "506 VARIANT_ALSO_NEGOTIATES"
  | "507 INSUFFICIENT_STORAGE"
  | "508 LOOP_DETECTED"
  | "509 BANDWIDTH_LIMIT_EXCEEDED"
  | "510 NOT_EXTENDED"
  | "511 NETWORK_AUTHENTICATION_REQUIRED";

export interface GeneralDto {
  name?: string;
  version?: string;
}

export interface ApplicationContext {
  parent?: any;
  id?: string;
  displayName?: string;
  autowireCapableBeanFactory?: AutowireCapableBeanFactory;
  applicationName?: string;
  /** @format int64 */
  startupDate?: number;
  environment?: Environment;
  /** @format int32 */
  beanDefinitionCount?: number;
  beanDefinitionNames?: string[];
  parentBeanFactory?: BeanFactory;
  classLoader?: {
    name?: string;
    registeredAsParallelCapable?: boolean;
    parent?: {
      name?: string;
      registeredAsParallelCapable?: boolean;
      unnamedModule?: {
        name?: string;
        classLoader?: {
          name?: string;
          registeredAsParallelCapable?: boolean;
          definedPackages?: {
            name?: string;
            annotations?: any[];
            declaredAnnotations?: any[];
            sealed?: boolean;
            specificationTitle?: string;
            specificationVersion?: string;
            specificationVendor?: string;
            implementationTitle?: string;
            implementationVersion?: string;
            implementationVendor?: string;
          }[];
          defaultAssertionStatus?: boolean;
        };
        descriptor?: {
          open?: boolean;
          automatic?: boolean;
        };
        named?: boolean;
        annotations?: any[];
        declaredAnnotations?: any[];
        /** @uniqueItems true */
        packages?: string[];
        nativeAccessEnabled?: boolean;
        layer?: any;
      };
      definedPackages?: {
        name?: string;
        annotations?: any[];
        declaredAnnotations?: any[];
        sealed?: boolean;
        specificationTitle?: string;
        specificationVersion?: string;
        specificationVendor?: string;
        implementationTitle?: string;
        implementationVersion?: string;
        implementationVendor?: string;
      }[];
      defaultAssertionStatus?: boolean;
    };
    unnamedModule?: {
      name?: string;
      classLoader?: {
        name?: string;
        registeredAsParallelCapable?: boolean;
        definedPackages?: {
          name?: string;
          annotations?: any[];
          declaredAnnotations?: any[];
          sealed?: boolean;
          specificationTitle?: string;
          specificationVersion?: string;
          specificationVendor?: string;
          implementationTitle?: string;
          implementationVersion?: string;
          implementationVendor?: string;
        }[];
        defaultAssertionStatus?: boolean;
      };
      descriptor?: {
        open?: boolean;
        automatic?: boolean;
      };
      named?: boolean;
      annotations?: any[];
      declaredAnnotations?: any[];
      /** @uniqueItems true */
      packages?: string[];
      nativeAccessEnabled?: boolean;
      layer?: any;
    };
    definedPackages?: {
      name?: string;
      annotations?: any[];
      declaredAnnotations?: any[];
      sealed?: boolean;
      specificationTitle?: string;
      specificationVersion?: string;
      specificationVendor?: string;
      implementationTitle?: string;
      implementationVersion?: string;
      implementationVendor?: string;
    }[];
    defaultAssertionStatus?: boolean;
  };
}

export type AutowireCapableBeanFactory = any;

export type BeanFactory = any;

export type DefaultHttpStatusCode = HttpStatusCode;

export interface Environment {
  activeProfiles?: string[];
  defaultProfiles?: string[];
}

export interface FilterRegistration {
  servletNameMappings?: string[];
  urlPatternMappings?: string[];
  name?: string;
  className?: string;
  initParameters?: Record<string, string>;
}

export interface HttpStatusCode {
  error?: boolean;
  is4xxClientError?: boolean;
  is5xxServerError?: boolean;
  is1xxInformational?: boolean;
  is2xxSuccessful?: boolean;
  is3xxRedirection?: boolean;
}

export interface JspConfigDescriptor {
  taglibs?: TaglibDescriptor[];
  jspPropertyGroups?: JspPropertyGroupDescriptor[];
}

export interface JspPropertyGroupDescriptor {
  defaultContentType?: string;
  buffer?: string;
  elIgnored?: string;
  errorOnELNotFound?: string;
  pageEncoding?: string;
  scriptingInvalid?: string;
  isXml?: string;
  includePreludes?: string[];
  includeCodas?: string[];
  urlPatterns?: string[];
  errorOnUndeclaredNamespace?: string;
  deferredSyntaxAllowedAsLiteral?: string;
  trimDirectiveWhitespaces?: string;
}

export interface RedirectView {
  applicationContext?: ApplicationContext;
  servletContext?: ServletContext;
  contentType?: string;
  requestContextAttribute?: string;
  staticAttributes?: Record<string, any>;
  exposePathVariables?: boolean;
  exposeContextBeansAsAttributes?: boolean;
  exposedContextBeanNames?: string[];
  beanName?: string;
  url?: string;
  contextRelative?: boolean;
  http10Compatible?: boolean;
  exposeModelAttributes?: boolean;
  encodingScheme?: string;
  statusCode?: DefaultHttpStatusCode | HttpStatus;
  expandUriTemplateVariables?: boolean;
  propagateQueryParams?: boolean;
  hosts?: string[];
  redirectView?: boolean;
  propagateQueryProperties?: boolean;
  attributesMap?: Record<string, any>;
  attributes?: Record<string, string>;
  attributesCSV?: string;
}

export interface ServletContext {
  sessionCookieConfig?: SessionCookieConfig;
  virtualServerName?: string;
  classLoader?: {
    name?: string;
    registeredAsParallelCapable?: boolean;
    definedPackages?: {
      name?: string;
      annotations?: any[];
      declaredAnnotations?: any[];
      sealed?: boolean;
      specificationTitle?: string;
      specificationVersion?: string;
      specificationVendor?: string;
      implementationTitle?: string;
      implementationVersion?: string;
      implementationVendor?: string;
    }[];
    defaultAssertionStatus?: boolean;
  };
  /** @format int32 */
  majorVersion?: number;
  /** @format int32 */
  minorVersion?: number;
  attributeNames?: any;
  contextPath?: string;
  initParameterNames?: any;
  /** @uniqueItems true */
  sessionTrackingModes?: ServletContextSessionTrackingModesEnum[];
  /** @format int32 */
  sessionTimeout?: number;
  /** @format int32 */
  effectiveMajorVersion?: number;
  /** @format int32 */
  effectiveMinorVersion?: number;
  serverInfo?: string;
  servletContextName?: string;
  servletRegistrations?: Record<string, ServletRegistration>;
  filterRegistrations?: Record<string, FilterRegistration>;
  /** @uniqueItems true */
  defaultSessionTrackingModes?: ServletContextDefaultSessionTrackingModesEnum[];
  /** @uniqueItems true */
  effectiveSessionTrackingModes?: ServletContextEffectiveSessionTrackingModesEnum[];
  jspConfigDescriptor?: JspConfigDescriptor;
  requestCharacterEncoding?: string;
  responseCharacterEncoding?: string;
}

export interface ServletRegistration {
  mappings?: string[];
  runAsRole?: string;
  name?: string;
  className?: string;
  initParameters?: Record<string, string>;
}

export interface SessionCookieConfig {
  /** @format int32 */
  maxAge?: number;
  domain?: string;
  httpOnly?: boolean;
  path?: string;
  secure?: boolean;
  name?: string;
  attributes?: Record<string, string>;
  /** @deprecated */
  comment?: string;
}

export interface TaglibDescriptor {
  taglibURI?: string;
  taglibLocation?: string;
}

export interface CaseLawMetadataDto {
  court?: string;
  organ?: string;
  url?: string;
  ecli?: string;
  /** @format date-time */
  decision_date?: string;
  decision_type?: string;
  case_number?: string;
}

export interface CaseLawResponseDto {
  summaryType?: string;
  /** @format int32 */
  analysisVersion?: number;
  summary?: CaselawSummaryCivilCase;
  prompts?: CaseLawSummaryPromptsDto;
  metadata?: CaseLawMetadataDto;
  /** @format int64 */
  wordCount?: number;
}

export interface CaseLawSummaryPromptsDto {
  model?: string;
  user_prompt?: string;
  system_prompt?: string;
  removed_from_prompt?: string;
}

export interface CaselawSummaryCivilCase {
  art: string;
  eugh?: boolean;
  ausgang?: string;
  rechtsmittel?: string;
  verfahrensart?: string;
  sachverhalt?: string;
  begehren?: string;
  gegenvorbringen?: string;
  berufende_partei?: string;
  entscheidung_gericht?: string;
  zusammenfassung_3_absaetze?: string[];
  zusammenfassung_3_saetze?: string;
  zeitungstitel_boulevard?: string;
  zeitungstitel_oeffentlich?: string;
  zeitungstitel_rechtszeitschrift?: string;
  schlussfolgerungen?: string[];
  wichtige_normen?: string[];
  hauptrechtsgebiete?: string[];
  unterrechtsgebiete?: string[];
}

export type ServletContextSessionTrackingModesEnum = "COOKIE" | "URL" | "SSL";

export type ServletContextDefaultSessionTrackingModesEnum =
  | "COOKIE"
  | "URL"
  | "SSL";

export type ServletContextEffectiveSessionTrackingModesEnum =
  | "COOKIE"
  | "URL"
  | "SSL";

export type GetShrinkwrapDocumentParamsCourtEnum =
  | "Justiz"
  | "VwGH"
  | "VfGH"
  | "BVwG"
  | "LVwG"
  | "DSB"
  | "GBK";

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "http://localhost:8080";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title OpenAPI definition
 * @version v0
 * @baseUrl http://localhost:8080
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags spring-chat-client-controller
     * @name InfoPdf
     * @request GET:/api/pdf
     */
    infoPdf: (
      query: {
        question: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<string, any>({
        path: `/api/pdf`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags shrinkwrap-controller
     * @name Hello
     * @request GET:/api/hello
     */
    hello: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/api/hello`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags shrinkwrap-controller
     * @name GetGeneralInfo
     * @request GET:/api/general
     */
    getGeneralInfo: (params: RequestParams = {}) =>
      this.request<GeneralDto, any>({
        path: `/api/general`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags shrinkwrap-controller
     * @name ExtensionInstall
     * @request GET:/api/extension-install
     */
    extensionInstall: (params: RequestParams = {}) =>
      this.request<RedirectView, any>({
        path: `/api/extension-install`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags spring-chat-client-controller
     * @name Generation
     * @request GET:/api/client
     */
    generation: (
      query: {
        question: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<string, any>({
        path: `/api/client`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags case-law-controller
     * @name GetShrinkwrapDocument
     * @request GET:/api/case-law/shrinkwrap
     */
    getShrinkwrapDocument: (
      query?: {
        /**
         * @minLength 1
         * @maxLength 100
         */
        ecli?: string;
        /**
         * @minLength 0
         * @maxLength 50
         */
        docNumber?: string;
        court?: GetShrinkwrapDocumentParamsCourtEnum;
        includePrompts?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<CaseLawResponseDto, any>({
        path: `/api/case-law/shrinkwrap`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags case-law-controller
     * @name GetCaselawOverview
     * @request GET:/api/case-law/overview
     */
    getCaselawOverview: (
      query: {
        docNumber: string;
        court: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/case-law/overview`,
        method: "GET",
        query: query,
        ...params,
      }),
  };
}
