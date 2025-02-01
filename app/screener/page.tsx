'use client';

import * as Constants from '@common/constants';
import DashboardLayout from '@components/page/DashboardLayout';
import UpdatingDataTable from '@components/examples/UpdatingDataTable';
import Card from '@components/Card';

export default function ScreenerPage() {
  return (
    <DashboardLayout previewPixelSRC="/preview.png">
      <Card title="Market Screener">
        <UpdatingDataTable data={Constants.SAMPLE_TABLE_DATA_CHANGE_ME} />
      </Card>
    </DashboardLayout>
  );
} 