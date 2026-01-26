'use client'

import { usePolymarketMarkets, useKalshiMarkets } from '@/lib/hooks/useMarkets'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function TestPage() {
  const polymarketQuery = usePolymarketMarkets()
  const kalshiQuery = useKalshiMarkets()

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">API Test Page</h1>
      <p className="text-muted-foreground">
        This page displays raw API responses to verify data structure
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Polymarket */}
        <Card>
          <CardHeader>
            <CardTitle>Polymarket API</CardTitle>
            <div className="text-sm text-muted-foreground">
              Status: {polymarketQuery.isLoading ? 'Loading...' : polymarketQuery.isError ? 'Error' : 'Success'}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {polymarketQuery.isLoading && (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            )}

            {polymarketQuery.isError && (
              <div className="text-red-500">
                Error: {polymarketQuery.error instanceof Error ? polymarketQuery.error.message : 'Unknown error'}
              </div>
            )}

            {polymarketQuery.data && (
              <div>
                <div className="mb-2 font-semibold">
                  Markets Count: {polymarketQuery.data.length}
                </div>
                {polymarketQuery.data.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Sample Market:</div>
                    <pre className="text-xs bg-muted p-3 rounded overflow-auto max-h-96">
                      {JSON.stringify(polymarketQuery.data[0], null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Kalshi */}
        <Card>
          <CardHeader>
            <CardTitle>Kalshi API</CardTitle>
            <div className="text-sm text-muted-foreground">
              Status: {kalshiQuery.isLoading ? 'Loading...' : kalshiQuery.isError ? 'Error' : 'Success'}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {kalshiQuery.isLoading && (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            )}

            {kalshiQuery.isError && (
              <div className="text-red-500">
                Error: {kalshiQuery.error instanceof Error ? kalshiQuery.error.message : 'Unknown error'}
              </div>
            )}

            {kalshiQuery.data && (
              <div>
                <div className="mb-2 font-semibold">
                  Markets Count: {kalshiQuery.data.length}
                </div>
                {kalshiQuery.data.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Sample Market:</div>
                    <pre className="text-xs bg-muted p-3 rounded overflow-auto max-h-96">
                      {JSON.stringify(kalshiQuery.data[0], null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Console Logs Info */}
      <Card>
        <CardHeader>
          <CardTitle>Console Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Check your browser console and server logs for detailed API response information.
            The API routes log the raw response structure for debugging.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
