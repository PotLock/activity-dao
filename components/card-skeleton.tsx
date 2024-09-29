import React from 'react';
import { Card, CardContent, Skeleton } from '@mui/material';

const CardSkeleton: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <Skeleton animation="wave" height={40} width="80%" />
        <Skeleton animation="wave" height={20} width="60%" />
        <Skeleton animation="wave" height={20} width="70%" />
        <Skeleton animation="wave" height={40} width="40%" style={{ marginTop: 12 }} />
      </CardContent>
    </Card>
  );
};

export default CardSkeleton;