import {
  Avatar,
  Button,
  Fab,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CustomModal from "../../components/CustomModal";
import { useRef, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { fr } from "date-fns/locale";
import { useParams } from "react-router";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import UploadIcon from "@mui/icons-material/Upload";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { addTask } from "../../redux/api/moduleApi";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import SnackBar from "../../components/SnackBar";

function compareDates(date1, date2) {
  var [day1, month1, year1] = date1.split("/");
  var [day2, month2, year2] = date2.split("/");

  // Rearrange the date string to YYYY/MM/DD format
  var formattedDate1 = year1 + "/" + month1 + "/" + day1;
  var formattedDate2 = year2 + "/" + month2 + "/" + day2;

  // Create JavaScript Date objects
  var jsDate1 = new Date(formattedDate1);
  var jsDate2 = new Date(formattedDate2);

  // Compare the dates
  if (jsDate1 < jsDate2) {
    return -1; // date1 is before date2
  } else if (jsDate1 > jsDate2) {
    return 1; // date1 is after date2
  } else {
    return 0; // date1 is equal to date2
  }
}

// Example usage:
var date1 = "15/05/2023";
var date2 = "16/05/2023";

var comparison = compareDates(date1, date2);
console.log(comparison); // Output: -1 (date1 is before date2)

function AddTask(props) {
  const { user } = useSelector((state) => state.auth);
  const { id: moduleId } = useParams();

  const [messageSnackBar, setMessageSnackBar] = useState("");
  const [typeSnackBar, setTypeSnackBar] = useState(null);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const { isLoading, mutate } = useMutation({
    mutationKey: "addTask",
    mutationFn: (data) => {
      return addTask(data, moduleId, user.token);
    },
    onSuccess: (data) => {
      setMessageSnackBar("Tâche ajoutée avec succès");
      setTypeSnackBar("success");
      setOpenSnackBar(true);
      props.setRefetch({});
    },
    onError: (err) => {},
  });

  const [openModalAddTask, setOpenModalAddTask] = useState(false);
  const [data, setData] = useState({
    debut: null,
    fin: null,
    description: null,
    bonus: 0,
    penalty: 0,
  });

  const fileInputRef = useRef(null);
  const [file, setFile] = useState();

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDeleteFile = () => {
    setFile(null);
  };

  const handleUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAddTask = () => {
    if (
      data.debut === null ||
      data.debut === "" ||
      data.fin === null ||
      data.fin === "" ||
      data.description === null ||
      data.description === ""
    ) {
      setMessageSnackBar("Veiller remplir tous les champs");
      setTypeSnackBar("error");
      setOpenSnackBar(true);
      return;
    }

    if (compareDates(data.debut, data.fin) === 1) {
      setMessageSnackBar(
        "La date de début doit être inférieur à la date de fin"
      );
      setTypeSnackBar("error");
      setOpenSnackBar(true);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("debut", data.debut);
    formData.append("fin", data.fin);
    formData.append("description", data.description);
    formData.append("bonus", data.bonus);
    formData.append("penalty", data.penalty);
    mutate(formData);
  };

  const handleCloseModal = () => {
    setOpenModalAddTask(false);
    setData({
      debut: null,
      fin: null,
      description: null,
      bonus: 0,
      penalty: 0,
    });
    setFile(null);
  };

  return (
    <div>
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => {
          setOpenModalAddTask(true);
        }}
        sx={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
        }}
      >
        <AddIcon />
      </Fab>
      <CustomModal open={openModalAddTask} setOpen={setOpenModalAddTask}>
        <SnackBar
          open={openSnackBar}
          setOpen={setOpenSnackBar}
          type={typeSnackBar}
          message={messageSnackBar}
        />
        <Stack direction="column" spacing={1.5}>
          <Typography>Ajouter une task</Typography>
          <Stack direction={"row"} spacing={1}>
            <TextField
              fullWidth
              label="Description"
              onChange={(e) => {
                setData({
                  ...data,
                  description: e.target.value,
                });
              }}
            />
            <div>
              <Tooltip title="Choisir un fichier">
                <IconButton
                  sx={{
                    height: 50,
                    width: 50,
                  }}
                  onClick={handleUploadButtonClick}
                >
                  <UploadIcon />
                </IconButton>
              </Tooltip>
              <input
                type="file"
                accept=".pdf"
                ref={fileInputRef}
                onChange={handleFileInputChange}
                style={{ display: "none" }}
              />
            </div>
          </Stack>
          {file && (
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{
                backgroundColor: "white",
                borderRadius: "5px",
                border: "1px solid rgba(0, 0, 0, 0.23)",
                alignItems: "center",
                padding: "5px",
              }}
            >
              <Typography>{file.name}</Typography>
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  alignItems: "center",
                }}
              >
                <Avatar
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "50%",
                    border: "1px solid red",
                  }}
                >
                  <IconButton onClick={handleDeleteFile}>
                    <DeleteOutlineIcon sx={{ color: "red" }} />
                  </IconButton>
                </Avatar>
              </Stack>
            </Stack>
          )}
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
              <DatePicker
                label="Date de debut"
                onChange={(e) => {
                  setData({
                    ...data,
                    debut: dayjs(e).format("DD/MM/YYYY"),
                  });
                }}
                sx={{
                  flex: 1,
                }}
              />
              <DatePicker
                label="Date du fin"
                onChange={(e) => {
                  setData({
                    ...data,
                    fin: dayjs(e).format("DD/MM/YYYY"),
                  });
                }}
                sx={{
                  flex: 1,
                }}
              />
            </Stack>
          </LocalizationProvider>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
            <TextField
              label="Bonus"
              fullWidth
              type="number"
              defaultValue={0}
              onChange={(e) => {
                setData({
                  ...data,
                  bonus: e.target.value,
                });
              }}
            />
            <TextField
              label="Penalty"
              fullWidth
              type="number"
              defaultValue={0}
              onChange={(e) => {
                setData({
                  ...data,
                  penalty: e.target.value,
                });
              }}
            />
          </Stack>
          <Stack
            direction="row"
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
            spacing={1}
          >
            <Button
              variant="outlined"
              sx={{
                textTransform: "none",
              }}
              onClick={handleCloseModal}
            >
              Annuler
            </Button>
            <LoadingButton
              loading={isLoading}
              variant="contained"
              sx={{
                textTransform: "none",
              }}
              onClick={handleAddTask}
            >
              Ajouter
            </LoadingButton>
          </Stack>
        </Stack>
      </CustomModal>
    </div>
  );
}

export default AddTask;
