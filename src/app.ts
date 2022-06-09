import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://Tambouil:tPXYNHrNSuu1mjOj@cluster0.fhmih.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));
