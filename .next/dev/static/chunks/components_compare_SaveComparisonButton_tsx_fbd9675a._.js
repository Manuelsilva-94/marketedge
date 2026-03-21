(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/compare/SaveComparisonButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SaveComparisonButton",
    ()=>SaveComparisonButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/react.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function SaveComparisonButton({ marketAId, marketBId }) {
    _s();
    const { data: session } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"])();
    const [saved, setSaved] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const targetId = `${marketAId}:${marketBId}`;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SaveComparisonButton.useEffect": ()=>{
            if (!session) return;
            fetch('/api/pins?type=COMPARISON').then({
                "SaveComparisonButton.useEffect": (r)=>r.json()
            }["SaveComparisonButton.useEffect"]).then({
                "SaveComparisonButton.useEffect": (d)=>{
                    if (d.pins?.some({
                        "SaveComparisonButton.useEffect": (p)=>p.targetId === targetId
                    }["SaveComparisonButton.useEffect"])) {
                        setSaved(true);
                    }
                }
            }["SaveComparisonButton.useEffect"]);
        }
    }["SaveComparisonButton.useEffect"], [
        session,
        targetId
    ]);
    const toggle = async ()=>{
        if (!session) {
            window.location.href = '/login';
            return;
        }
        setLoading(true);
        if (saved) {
            await fetch('/api/pins', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type: 'COMPARISON',
                    targetId
                })
            });
            setSaved(false);
        } else {
            await fetch('/api/pins', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type: 'COMPARISON',
                    targetId
                })
            });
            setSaved(true);
        }
        setLoading(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: toggle,
        disabled: loading,
        className: `flex items-center gap-2 text-sm transition-colors disabled:opacity-50 ${saved ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: saved ? '★' : '☆'
            }, void 0, false, {
                fileName: "[project]/components/compare/SaveComparisonButton.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: loading ? '...' : saved ? 'Saved to dashboard' : 'Save to dashboard'
            }, void 0, false, {
                fileName: "[project]/components/compare/SaveComparisonButton.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/compare/SaveComparisonButton.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_s(SaveComparisonButton, "0xL+aDkN9uB3/+IjZ5RNlb/h6f4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"]
    ];
});
_c = SaveComparisonButton;
var _c;
__turbopack_context__.k.register(_c, "SaveComparisonButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_compare_SaveComparisonButton_tsx_fbd9675a._.js.map