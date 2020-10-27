var urlE = "https://localhost:44377/api/entidades";
var urlG = "https://localhost:44377/api/grupos";

var asignaIdGrupo = 0;

Get();

function cargar() {
    fetch(urlG).then(function (response) {
        return response.json();
    }).then(function (Data) {
        document.getElementById("grupos").innerHTML = "";
        grupos = Data;
        select = document.getElementById("grupos");
        for (var i = 0; i < grupos.length; i++) {
            var option = document.createElement("option");
            if (asignaIdGrupo == 0) {
                option.innerHTML = grupos[i].id + "- " + grupos[i].nombre + " - " + grupos[i].color;
                select.appendChild(option);
            } else {
                if (grupos[i].id == asignaIdGrupo) {
                    option.innerHTML = grupos[i].id + "- " + grupos[i].nombre + " - " + grupos[i].color;
                    select.appendChild(option);
                }
            }
        }
    });
}

function Guardar() {
    console.log(document.getElementById("Nombre").value);
    var n = document.getElementById("grupos").value.indexOf("-");
    var grupo = document.getElementById("grupos").value.substring(0, n);
    if (document.getElementById("Nombre").value == "") {
        alertify.error("Debe ingresar el Nombre");
    } else if (document.getElementById("Direccion").value == "") {
        alertify.error("Debe ingresar la Direccion");
    } else if (document.getElementById("CodPostal").value == "") {
        alertify.error("Debe ingresar el Codigo postal");
    } else if (document.getElementById("Telefono").value == "") {
        alertify.error("Debe ingresar el Telefono");
    } else if (document.getElementById("Email").value == "") {
        alertify.error("Debe ingresar el Email");
    } else if (document.getElementById("Pais").value == "") {
        alertify.error("Debe ingresar el Pais");
    } else if (document.getElementById("Activo").checked == false && document.getElementById("Inactivo").checked == false) {
        alertify.error("Debe seleccionar el Estado");
    } else if (grupo == 0) {
        alertify.error("Debe seleccionar un Grupo");
    } else {
        if (document.getElementById("Id").value != "") {
            Put();
        } else {
            Post();
        }
        alertify.success("Operacion Realizada");
    }
}

function Clear() {
    location.reload();
}

function Post() {
    var n = document.getElementById("grupos").value.indexOf("-");
    var grupo = document.getElementById("grupos").value.substring(0, n);
    var estado = 0;
    if (document.getElementById("Activo").checked) {
        estado = 1;
    }
    fetch(urlE, {
        method: "POST",
        body: JSON.stringify({
            Nombre: document.getElementById("Nombre").value,
            Direccion: document.getElementById("Direccion").value,
            CodPostal: document.getElementById("CodPostal").value,
            Telefono: document.getElementById("Telefono").value,
            Email: document.getElementById("Email").value,
            Pais: document.getElementById("Pais").value,
            Estado: estado,
            IdGrupo: grupo
        }),
        headers: {
            'Accept': "application/json",
            "Content-Type": "application/json"
        }
    }).then(function (response) {
        if (response.ok) {
            return response.text();
        } else {
            alert("Error al ejecutar solicitud");
        }
    }).then(function (Data) {
        console.log(Data);
        Get();
        Clear();
    });
}

function Put() {
    var n = document.getElementById("grupos").value.indexOf("-");
    var grupo = document.getElementById("grupos").value.substring(0, n);
    var estado = 0;
    if (document.getElementById("Activo").checked) {
        estado = 1;
    }
    fetch(urlE, {
        method: "PUT",
        body: JSON.stringify({
            Id: document.getElementById("Id").value,
            Nombre: document.getElementById("Nombre").value,
            Direccion: document.getElementById("Direccion").value,
            CodPostal: document.getElementById("CodPostal").value,
            Telefono: document.getElementById("Telefono").value,
            Email: document.getElementById("Email").value,
            Pais: document.getElementById("Pais").value,
            Estado: estado,
            IdGrupo: grupo
        }),
        headers: {
            'Accept': "application/json",
            "Content-Type": "application/json"
        }
    }).then(function (response) {
        if (response.ok) {
            return response.text();
        } else {
            alert("Error al ejecutar solicitud");
        }
    }).then(function (Data) {
        console.log(Data);
        Get();
        Clear();
    });
}

function Delete(id) {
    alertify.confirm("¿Seguro desea eliminar el registro?",
        function () {
            fetch(urlE, {
                method: "DELETE",
                body: JSON.stringify({
                    Id: id
                }),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                if (response.ok) {
                    return response.text();
                } else {
                    alert("Error al ejecutar solicitud");
                }
            }).then(function (Data) {
                console.log(Data);
                Get();
            });
        },
        function () {
            alertify.error('Cancelado');
        }
    );
}

function OpenEdit(id, nombre, direccion, codPostal, telefono, email, pais, estado, idGrupo) {
    document.getElementById("Id").value = id;
    document.getElementById("Nombre").value = nombre;
    document.getElementById("Direccion").value = direccion;
    document.getElementById("CodPostal").value = codPostal;
    document.getElementById("Telefono").value = telefono;
    document.getElementById("Email").value = email;
    document.getElementById("Pais").value = pais;
    if (estado == 1) {
        document.getElementById("Activo").checked = true;
    } else {
        document.getElementById("Inactivo").checked = true;
    }
    asignaIdGrupo = idGrupo;
    cargar();
}

function Get() {
    fetch(urlE).then(function (response) {
        return response.json();
    }).then(function (Data) {
        document.getElementById("divLista").innerHTML = "";
        for (i = 0; i < Data.length; i++) {
            let divElement = document.createElement("div");
            let divSpan = document.createElement("span");
            let divButtonDelete = document.createElement("button");
            let divButtonEdit = document.createElement("button");
            let est = "ACTIVO";
            if (Data[i].estado == 0){
                est = "INACTIVO";
            }
            divSpan.innerHTML = est + " | " + Data[i].nombre + " | " + Data[i].direccion + " | " + Data[i].codPostal + " | " + Data[i].telefono + " | " + Data[i].email + " | " + Data[i].pais;

            divButtonDelete.innerHTML = "Eliminar";
            divButtonDelete.MiId = Data[i].id;
            divButtonDelete.addEventListener("click", function (miButton) {
                Delete(miButton.target.MiId);
            });

            divButtonEdit.innerHTML = "Editar";
            divButtonEdit.MiId = Data[i].id;
            divButtonEdit.MiNombre = Data[i].nombre;
            divButtonEdit.MiDireccion = Data[i].direccion;
            divButtonEdit.MiCodPostal = Data[i].codPostal;
            divButtonEdit.MiTelefono = Data[i].telefono;
            divButtonEdit.MiEmail = Data[i].email;
            divButtonEdit.MiPais = Data[i].pais;
            divButtonEdit.MiEstado = Data[i].estado;
            divButtonEdit.MiIdGrupo = Data[i].idGrupo;
            divButtonEdit.addEventListener("click", function (miButton) {
                OpenEdit(
                    miButton.target.MiId,
                    miButton.target.MiNombre,
                    miButton.target.MiDireccion,
                    miButton.target.MiCodPostal,
                    miButton.target.MiTelefono,
                    miButton.target.MiEmail,
                    miButton.target.MiPais,
                    miButton.target.MiEstado,
                    miButton.target.MiIdGrupo
                );
            });

            divElement.appendChild(divButtonDelete);
            divElement.appendChild(divButtonEdit);
            divElement.appendChild(divSpan);            
            document.getElementById("divLista").appendChild(divElement);
        }
        cargar();
    });
} 