(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/arbitrage/ArbitrageLoadingProgress.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArbitrageLoadingProgress",
    ()=>ArbitrageLoadingProgress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
const PROGRESS_MESSAGES = [
    'Scanning Polymarket markets...',
    'Matching with Kalshi candidates...',
    'Validating semantic matches...',
    'Fetching live prices...',
    'Finding arbitrage opportunities...'
];
const INTERVAL_MS = 2500;
function ArbitrageLoadingProgress() {
    _s();
    const [index, setIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ArbitrageLoadingProgress.useEffect": ()=>{
            const id = setInterval({
                "ArbitrageLoadingProgress.useEffect.id": ()=>{
                    setIndex({
                        "ArbitrageLoadingProgress.useEffect.id": (i)=>(i + 1) % PROGRESS_MESSAGES.length
                    }["ArbitrageLoadingProgress.useEffect.id"]);
                }
            }["ArbitrageLoadingProgress.useEffect.id"], INTERVAL_MS);
            return ({
                "ArbitrageLoadingProgress.useEffect": ()=>clearInterval(id)
            })["ArbitrageLoadingProgress.useEffect"];
        }
    }["ArbitrageLoadingProgress.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-8 flex flex-col items-center justify-center gap-4 rounded-lg border border-white/10 bg-white/5 px-6 py-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-4 w-4 animate-spin rounded-full border-2 border-[#00ff88]/30 border-t-[#00ff88]"
                    }, void 0, false, {
                        fileName: "[project]/components/arbitrage/ArbitrageLoadingProgress.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-lg font-medium text-foreground",
                        children: PROGRESS_MESSAGES[index]
                    }, void 0, false, {
                        fileName: "[project]/components/arbitrage/ArbitrageLoadingProgress.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/arbitrage/ArbitrageLoadingProgress.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-muted-foreground",
                children: "This usually takes 20–60 seconds"
            }, void 0, false, {
                fileName: "[project]/components/arbitrage/ArbitrageLoadingProgress.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/arbitrage/ArbitrageLoadingProgress.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_s(ArbitrageLoadingProgress, "c3fuAdVwNN91t4bNS1qBXl5hAWY=");
_c = ArbitrageLoadingProgress;
var _c;
__turbopack_context__.k.register(_c, "ArbitrageLoadingProgress");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_arbitrage_ArbitrageLoadingProgress_tsx_84648da6._.js.map