"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var data_grid_1 = require("@material-ui/data-grid");
var SortProxy_1 = require("../../connector/SortProxy");
var Proxy_1 = require("../../connector/Proxy");
var Table = function (_a) {
    var columns = _a.columns, source = _a.source, rerenderFlag = _a.rerenderFlag;
    var _b = react_1.useState([]), data = _b[0], setData = _b[1];
    var _c = react_1.useState(1), page = _c[0], setPage = _c[1];
    var _d = react_1.useState(false), loading = _d[0], setLoading = _d[1];
    var _e = react_1.useState(0), totalRows = _e[0], setTotalRows = _e[1];
    var _f = react_1.useState([
        { field: '_id', sort: 'asc' },
    ]), sortModel = _f[0], setSortModel = _f[1];
    var handleSortModelChange = function (params) {
        if (params.sortModel !== sortModel) {
            setSortModel(params.sortModel);
        }
    };
    react_1.useEffect(function () {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var sort, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sort = SortProxy_1.default(sortModel);
                        return [4 /*yield*/, Proxy_1.get(source, { page: page, sort: sort }, setLoading)];
                    case 1:
                        result = _a.sent();
                        result.docs.forEach(function (item) { return item.id = item._id; });
                        setData(result.docs);
                        if (totalRows !== result.total) {
                            setPage(1);
                            setTotalRows(result.total);
                        }
                        return [2 /*return*/];
                }
            });
        }); })();
    }, [page, sortModel, source, rerenderFlag]);
    return (<data_grid_1.DataGrid paginationMode={'server'} rows={data} columns={columns} pageSize={15} rowCount={totalRows} loading={loading} disableColumnFilter disableColumnMenu page={page - 1} onPageChange={function (params) {
            setPage(params.page + 1);
        }} disableSelectionOnClick sortingMode="server" sortModel={sortModel} onSortModelChange={handleSortModelChange}/>);
};
exports.default = Table;
