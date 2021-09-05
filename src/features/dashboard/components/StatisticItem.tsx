import { Typography } from '@material-ui/core'
import { Box, createStyles, makeStyles, Paper, Theme } from '@material-ui/core'
import React from 'react'

export interface StatisticItemProps {
    icon: React.ReactElement,
    label: string,
    value: string | number | undefined
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'space-between',
            alignItems: 'center',

            padding: theme.spacing(1,2),
            border: `1px solid ${theme.palette.divider}`,
            marginRight: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
        title:{
            
        }
    })
)

export default function StatisticItem({icon, label, value}:StatisticItemProps) {
    const classes = useStyles()
    return (
        <Paper className={classes.root}>
            <Box>
                {icon}
            </Box>
            <Box>
                <Typography variant="h5" align="right" color="primary">
                    {value}
                </Typography>
                <Typography variant="caption" 
                 color="primary">
                    {label}
                </Typography>
            </Box>
        </Paper>
    )
}
