<template>
    <div class="d-flex flex-column align-center">
        <h1 class="pa-5 mb-3">I tuoi prodotti</h1>
        <div class="d-flex justify-center justify-sm-end w-100">
            <v-btn class="bg-red text-white" @click="create = !create">Aggiungi prodotto <v-icon icon="mdi-plus" end/></v-btn>
        </div>
        <v-data-table class="pa-5 d-sm-none" :items="products" :headers="mobileHeaders">
            <template v-slot:item="{item}">
                <tr>
                    <td>{{item.title}}</td>
                    <td>{{item.price + '€'}}</td>
                    <td>
                        <v-btn
                            variant="text"
                            icon="mdi-information-box-outline"
                            @click="row = products.find(product => product.id === item.id)!; detailsSheet = !detailsSheet"
                        ></v-btn>
                    </td>
                </tr>
            </template>
        </v-data-table>
        <v-bottom-sheet v-model="detailsSheet" inset>
      <v-card
        class="px-4"
      >
        <v-card-text>
            <div class="d-flex justify-space-between align-center w-100">
                <h1 class="text-h5">Dettagli</h1>
              <v-btn
                variant="text"
                @click="detailsSheet = !detailsSheet"
                icon="mdi-close"
              >
              </v-btn>
            </div>
            <table class="w-100 text-left py-4">
              <tr>
                <th>Nome</th>
                <td>{{ row.title }}</td>
              </tr>
              <tr>
                <th>Marca</th>
                <td>{{ row.brand }}</td>
              </tr>
              <tr>
                <th>Prezzo</th>
                <td>{{ row.price + '€' }}</td>
              </tr>
              <tr>
                <th>Sconto</th>
                <td>{{ Math.round(row.discountPercentage!) + '%' }}</td>
              </tr>
              <tr>
                <th>Categoria</th>
                <td>{{ row.category }}</td>
              </tr>
            </table>
            <div class="d-flex justify-space-between pa-2">
              <v-btn @click="openEdit(row.id!)">Modifica <v-icon icon="mdi-pencil" end></v-icon></v-btn>
              <v-btn class="bg-red text-white" @click="deleteProduct(row.id!);">Elimina <v-icon icon="mdi-delete-outline" end></v-icon></v-btn>
            </div>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
        <v-data-table class="pa-5 d-none d-sm-block" :items="products" :headers="desktopHeaders">
            <template v-slot:item="{item}">
                <tr>
                    <td>{{ item.brand }}</td>
                    <td>{{ item.title }}</td>
                    <td>{{ item.price + '€' }}</td>
                    <td>{{ Math.round(item.discountPercentage!) + '%'}}</td>
                    <td>{{ item.category }}</td>
                    <td>
                        <v-btn
                            variant="text"
                            icon="mdi-pencil"
                            @click="openEdit(item.id!)"
                        ></v-btn>
                    </td>
                    <td>
                        <v-btn
                            variant="text"
                            icon="mdi-delete-outline"
                            @click="deleteProduct(item.id!)"
                        ></v-btn>
                    </td>
                </tr>
            </template>
        </v-data-table>
    </div>
    <v-bottom-sheet v-model="create" inset>
      <v-card
        class="px-4"
      >
        <v-card-text>
            <div class="d-flex justify-space-between align-center w-100">
                <h1 class="text-h5">Crea un nuovo prodotto</h1>
              <v-btn
                variant="text"
                @click="create = !create"
                icon="mdi-close"
              >
              </v-btn>
            </div>
            <table class="w-100 text-left py-4">
              <tr>
                <td>
                  <v-text-field
                    clearable
                    label="Nome"
                    variant="solo"
                    v-model="createForm.title"
                    ></v-text-field>
                </td>
              </tr>
              <tr>
                <td>
                  <v-text-field
                    clearable
                    label="Marca"
                    variant="solo"
                    v-model="createForm.brand"
                    ></v-text-field>
                </td>
              </tr>
              <tr>
                <td>
                  <v-text-field
                    clearable
                    label="Prezzo (€)"
                    variant="solo"
                    v-model="createForm.price"
                    ></v-text-field>
                </td>
              </tr>
              <tr>
                <td>
                  <v-text-field
                    clearable
                    label="Sconto (%)"
                    variant="solo"
                    v-model="createForm.discountPercentage"
                    ></v-text-field>
                </td>
              </tr>
              <tr>
                <td>
                  <v-text-field
                    clearable
                    label="Categoria"
                    variant="solo"
                    v-model="createForm.category"
                    ></v-text-field>
                </td>
              </tr>

            </table>
            <div class="d-flex justify-space-between pa-2">
              <v-btn @click="create = false">Cancella <v-icon icon="mdi-cancel" end></v-icon></v-btn>
              <v-btn class="bg-red text-white" @click="createProduct(createForm);">Salva <v-icon icon="mdi-content-save-edit" end></v-icon></v-btn>
            </div>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
    <v-bottom-sheet v-model="edit" inset>
      <v-card
        class="px-4"
      >
        <v-card-text>
            <div class="d-flex justify-space-between align-center w-100">
                <h1 class="text-h5">Modifica</h1>
              <v-btn
                variant="text"
                @click="edit = !edit"
                icon="mdi-close"
              >
              </v-btn>
            </div>
            <table class="w-100 text-left py-4">
              <tr>
                <td>
                  <v-text-field
                    clearable
                    label="Nome"
                    variant="solo"
                    v-model="detailsEditForm.title"
                    ></v-text-field>
                </td>
              </tr>
              <tr>
                <td>
                  <v-text-field
                    clearable
                    label="Marca"
                    variant="solo"
                    v-model="detailsEditForm.brand"
                    ></v-text-field>
                </td>
              </tr>
              <tr>
                <td>
                  <v-text-field
                    clearable
                    label="Prezzo (€)"
                    variant="solo"
                    v-model="detailsEditForm.price"
                    ></v-text-field>
                </td>
              </tr>
              <tr>
                <td>
                  <v-text-field
                    clearable
                    label="Sconto (%)"
                    variant="solo"
                    v-model="detailsEditForm.discountPercentage"
                    ></v-text-field>
                </td>
              </tr>
              <tr>
                <td>
                  <v-text-field
                    clearable
                    label="Categoria"
                    variant="solo"
                    v-model="detailsEditForm.category"
                    ></v-text-field>
                </td>
              </tr>

            </table>
            <div class="d-flex justify-space-between pa-2">
              <v-btn @click="edit = false">Cancella <v-icon icon="mdi-cancel" end></v-icon></v-btn>
              <v-btn class="bg-red text-white" @click="updateProduct(detailsEditForm);">Salva <v-icon icon="mdi-content-save-edit" end></v-icon></v-btn>
            </div>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
    
</template>
<script setup lang="ts">
import type { Product } from '~/model/product';

  const {value: accessToken} = useCookie('accessToken'); 
  const products = ref<Partial<Product>[]>([]);

  const { data } = await useFetch('https://dummyjson.com/products/?limit=15', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`, 
      'Content-Type': 'application/json'
    },
  });   
  const { value } = data as any;
  products.value = value.products;

  const detailsSheet = ref(false);
  const row = ref<Partial<Product>>({})
  const detailsEditForm = ref<Partial<Product>>({});
  const edit = ref(false)
  const create = ref(false)
  const createForm = ref<Partial<Product>>({});
  const desktopHeaders = [
    {
        title: 'Marca',
    },
    {
        title: 'Nome',
    },
    {
        title: 'Prezzo'
    },
    {
        title: 'Sconto'
    },
    {
        title: 'Categoria'
    },
    {
        title: 'Modifica'
    },
    {
        title: 'Elimina'
    }
  ]
  const mobileHeaders = [
    {
        title: 'Nome',
    },
    {
        title: 'Prezzo'
    },
    {
        title: 'Dettagli'
    }
  ] 

  const openEdit = (id: number) => {
    detailsEditForm.value = {...products.value.find(product => product.id === id)}; 
    edit.value = !edit.value;
  }
  const deleteProduct = async (productId: number) => {
    const deletedItem = await $fetch<Product>(`https://dummyjson.com/products/${productId}`, 
    {
      method: 'DELETE',
      headers: { 
        'Authorization': `Bearer ${accessToken}`,
      }
    });
    if(deletedItem.isDeleted){          
      products.value = products.value.filter(product => product.id !== deletedItem.id)
      detailsSheet.value = !detailsSheet    
    }  
  }

  const createProduct = async (newProduct: Partial<Product>) => {
    const newItem = await $fetch<Product>('https://dummyjson.com/products/add', {
    method: 'POST',
    headers: { 
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({...newProduct, id: products.value.length + 1})
    })
    products.value = [...products.value, newItem ];
    create.value = false;
  }

  const updateProduct = async (selectedProduct: Partial<Product>) => {    
    const updatedItem = await $fetch<Product>(`https://dummyjson.com/products/${selectedProduct.id}`, {
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json' 
      },
      body: {
        title: selectedProduct.title,
        brande: selectedProduct.brand,
        price: selectedProduct.price,
        discountPercentage: selectedProduct.discountPercentage,
        category: selectedProduct.category
      }
    });    
    const index = products.value.findIndex(product => product.id === selectedProduct.id);
    const newProducts = products.value.filter(product => product.id !== selectedProduct.id)
    newProducts.splice(index, 0, updatedItem)
    products.value = [...newProducts ];
    edit.value = false;
    detailsSheet.value = false;
  }
</script>