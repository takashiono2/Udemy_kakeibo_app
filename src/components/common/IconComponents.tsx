import React, { JSX } from 'react'
import FastfoodIcon from "@mui/icons-material/Fastfood";
import AlarmIcon from "@mui/icons-material/Alarm";
import { AddHome as AddHomeIcon, Group as GroupIcon, SportsTennis as SportsTennisIcon, Train as TrainIcon, Work as WorkIcon, AddBusiness as AddBusinessIcon, Savings as SavingsIcon } from "@mui/icons-material";
import { ExpenseCategory, IncomeCategory } from '../../types';

const IconComponents: Record<IncomeCategory | ExpenseCategory, JSX.Element> = {
  食費: <FastfoodIcon fontSize="small" />,
  日用品: <AlarmIcon fontSize="small" />,
  住居費: <AddHomeIcon fontSize="small" />,
  交際費: <GroupIcon fontSize="small" />,
  娯楽: <SportsTennisIcon fontSize="small" />,
  交通費: <TrainIcon fontSize="small" />,
  給与: <WorkIcon fontSize="small" />,
  副収入: <SavingsIcon fontSize="small" />,
  お小遣い: <AddBusinessIcon fontSize="small" />,
};

export default IconComponents;
