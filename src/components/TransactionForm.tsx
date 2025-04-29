import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  ListItemIcon,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { JSX, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close"; // 閉じるボタン用のアイコン
import FastfoodIcon from "@mui/icons-material/Fastfood";
import AlarmIcon from "@mui/icons-material/Alarm";
import { AddHome as AddHomeIcon, Group as GroupIcon, SportsTennis as SportsTennisIcon, Train as TrainIcon, Work as WorkIcon, AddBusiness as AddBusinessIcon, Savings as SavingsIcon } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";

interface TransactionFormProps {
  onCloseForm: () => void
  isEntryDrawerOpen: boolean;
  currentDay: string;
}

type IncomeExpense = "income" | "expense"; // 収入か支出かの型定義

//型定義：　CategoryItemとして、labelとiconを定義、IncomeCategory | ExpenseCategoryを使う
type CategoryItem = {
  label: string;
  icon: JSX.Element;
}

const TransactionForm = ({ onCloseForm, isEntryDrawerOpen, currentDay }: TransactionFormProps) => {

  const formWidth = 320;

  const expenseCategories: CategoryItem[] = [
    { label: "食費", icon: <FastfoodIcon fontSize="small" /> },
    { label: "日用品", icon: <AlarmIcon fontSize="small" /> },
    { label: "住居費", icon: <AddHomeIcon fontSize="small" /> },
    { label: "交際費", icon: <GroupIcon fontSize="small" /> },
    { label: "娯楽", icon: <SportsTennisIcon fontSize="small" /> },
    { label: "交通費", icon: <TrainIcon fontSize="small" /> },
  ]

  const incomeCategories: CategoryItem[] = [
    { label: "給与", icon: <WorkIcon fontSize="small" /> },
    { label: "副収入", icon: <SavingsIcon fontSize="small" /> },
    { label: "お小遣い", icon: <AddBusinessIcon fontSize="small" /> },
  ]

  const [categories, setCategories] = useState<CategoryItem[]>(expenseCategories); // カテゴリの状態管理

  const { control, setValue, watch } = useForm({
    defaultValues: {
      type: "expense", // 支出
      date: currentDay,
      category: "",
      amount: 0,
      content: "",
    }
  });

  const incomeExpenseToggle = (type: IncomeExpense) => {
    setValue("type", type);
  };

  useEffect(() => {
    setValue("date", currentDay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDay]);

  // 収支タイプを監視
  const currentType = watch("type");

  useEffect(() => {
    const newCategories: CategoryItem[] = currentType === "expense" ? expenseCategories : incomeCategories;
    setCategories(newCategories);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentType]);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 64,
        right: isEntryDrawerOpen ? formWidth : "-2%", // フォームの位置を調整、falseの場合は-2%
        width: formWidth,
        height: "100%",
        bgcolor: "background.paper",
        zIndex: (theme) => theme.zIndex.drawer - 1,
        transition: (theme) =>
          theme.transitions.create("right", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        p: 2, // 内部の余白
        boxSizing: "border-box", // ボーダーとパディングをwidthに含める
        boxShadow: "0px 0px 15px -5px #777777",
      }}
    >
      {/* 入力エリアヘッダー */}
      <Box display={"flex"} justifyContent={"space-between"} mb={2}>
        <Typography variant="h6">入力</Typography>
        {/* 閉じるボタン */}
        {/* onCloseFormを呼び出す */}
        <IconButton
          onClick={onCloseForm}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      {/* フォーム要素 */}
      <Box component={"form"}>
        <Stack spacing={2}>
          {/* 収支切り替えボタン */}
          <Controller
            name="type"
            control={control}
            render={({ field }) => {
              return (
                <ButtonGroup fullWidth>
                  <Button
                    variant={field.value === "expense" ? "contained" : "outlined"}
                    color="error"
                    onClick={() => incomeExpenseToggle("expense")}
                  >
                    支出
                  </Button>
                  <Button
                    variant={field.value === "income" ? "contained" : "outlined"}
                    color={"primary"}
                    onClick={() => incomeExpenseToggle("income")}
                  >収入</Button>
                </ButtonGroup>
              )
            }}
          />
          {/* 日付 */}
          <Controller
            name="date"
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  label="日付"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />)
            }}
          />

          {/* カテゴリ */}
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="カテゴリ"
                label="カテゴリ"
                select
                fullWidth
              >
                {categories.map((category) => (
                  <MenuItem key={category.label} value={category.label}>
                    <ListItemIcon>{category.icon}</ListItemIcon>
                    {category.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          {/* 金額 */}
          <Controller
            name="amount"
            control={control}
            render={({ field }) => {
              console.log('field' + JSON.stringify(field));
              return (
                <TextField
                  {...field}
                  value={field.value === 0 ? "" : field.value}
                  onChange={(e) => {
                    const newValue = parseInt(e.target.value, 10) || 0;
                    field.onChange(newValue);
                  }}
                  label="金額"
                  type="number"
                />)
            }}
          />
          {/* 内容 */}
          <Controller
            name="content"
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  label="内容"
                  type="text" />
              )
            }}

          />
          {/* 保存ボタン */}
          <Button
            type="submit"
            variant="contained"
            color={currentType === "income" ? "primary" : "error"}
            fullWidth
          >
            保存
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
export default TransactionForm;
