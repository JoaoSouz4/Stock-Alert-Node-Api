import Product from "../models/ProductModel";
import { Request, Response } from "express";
import { PDFDocument, rgb } from 'pdf-lib';

class ProductController {

    public static async GetOneProduct(req: Request, res: Response){
        const id = req.params.id;

        try {
            const product = await Product.findById({_id: id});
            res.status(200).json({
                isSucess: true,
                requestData: product
            })
        } catch (error) {
            console.log(error)
        }
    }
    public static async Register(req: Request, res: Response){
        const {name, registedBy, status, categorie} = req.body;
        try{
            const product = await Product.create({
                name: name,
                registedBy: registedBy,
                createdAt: new Date,
                status: status,
                categorie: categorie
            })

            res.status(200).json({
                isSucess: true,
                requestMessage: 'Produto registrado com sucesso',
                data: {
                    product: product
                }
            })
        }catch(err){
            console.log(err)
        }
    }


    public static async getAllProducts (req: Request, res: Response){
        const products = await Product.find({});
        res.status(200).json({
            isSucess: true,
            requestMessage: 'Todos os produtos retornados com sucesso',
            data: {
                products: products,
                currentAmount: products.length
            }
        })
    }


    public static async getOneList(req: Request, res: Response){
        const nameList = req.params.namelist;
        const products = await Product.find({categorie: nameList});
        res.status(200).json({
            isSucess: true,
            requestMessage: `Todos os produtos da categoria ${nameList} retornados com sucesso`,
            data: {
                products: products,
                currentAmount: products.length
            }
        })

    }

    public static async DeleteCategorieProducts(req: Request, res: Response){
        const categorie =  req.params.categorie;

        try {
            await Product.deleteMany({categorie: categorie});
            
            const currentList = await Product.find({categorie: categorie});

            await res.status(200).json({
                isSucess: true,
                requestMessage: `Todos os items da categoria ${categorie} foram excluídos`,
                requestData: {
                    currentList: currentList,
                    currentAmount: currentList.length
                }
            })
        } catch (error) {
            console.log(error)
        } 
    }

    public static async DeleteItem(req: Request, res: Response){
        const name =  req.params.nameproduct;
        const categorie = req.params.categorie;

        try{
            await Product.findOneAndDelete({name: name, categorie: categorie});
            const currentList = await Product.find({categorie: categorie});

            res.status(200).json({
                isSucess: true,
                requestMessage: 'Item deletado',
                requestData: {
                    currentList: currentList,
                    currentAmount: currentList.length
                }
            })
        }catch(error){
            res.status(400).json({
                isSucess: false,
                requestMessage: 'Erro ao deletar item',
                requestData: {
                    data: error
                }
            })
        }
    }

    public static async UpdateItem(req: Request, res: Response){
        const idItem: string = req.params.id;
        const {name, categorie, status} = req.body;
        console.log('name:', name, ' categorie: ', categorie, ' status: ', status)
        try {
            const item = await Product.findById({_id: idItem});
           
            const ItemTarget = await Product.findOneAndUpdate({_id: idItem}, {name: name, categorie: categorie, status: status});
            const currentList = await Product.find({categorie: item?.categorie});
            console.log(currentList)
            res.status(200).json({
                isSucess: true,
                requestMessage: 'item atualizado com sucesso',
                requestData: ItemTarget,
                currentList: currentList,
                currentAmount: currentList.length
            })
        } catch (error) {
            res.status(400).json({
                isSucess: false,
                requestMessage: 'erro ao atualizar item',
                requestData: error,
            })
        }
    }

    public static async genPdf(req: Request, res: Response){
        const pdfDoc = await PDFDocument.create();

        const pageSize: [number, number] = [595.28, 841.89]; // Tamanho A4
        const margin = 50;
        const rowHeight = 25;
        const columnWidths = [150, 50, 100, 100]; // Largura das colunas

        // Consulta no MongoDB, usando o modelo do Mongoose
        const tableData: any = await Product.find({}).lean(); // Usando .lean() para obter objetos simples

        // Mapeando apenas os campos necessários
        const filteredData = tableData.map((item: any) => ({
            name: item.name,
            status: item.status,
            createdAt: item.createdAt.toLocaleDateString(), // Formatando a data
            categorie: item.categorie,
        }));

        // Agrupar os dados por categoria
        const groupedByCategory = filteredData.reduce((acc: Record<string, any[]>, item: any) => {
            // Se a categoria ainda não existir no acumulador, crie-a
            if (!acc[item.categorie]) {
            acc[item.categorie] = [];
            }
            // Adicionar o item à categoria correspondente
            acc[item.categorie].push(item);
            return acc;
        }, {});

        // Cabeçalhos da tabela
        const headers = ['Nome', 'Status', 'Data de Criação', 'Categoria'];

        let currentY = pageSize[1] - margin;
  
        // Função para desenhar cabeçalhos com fundo azul
        function drawHeaders(page: any, currentY: number) {
            headers.forEach((header, index) => {
            const cellX = margin + columnWidths.slice(0, index).reduce((a, b) => a + b, 0);
            // Desenhar o fundo azul do cabeçalho
            page.drawRectangle({
                x: cellX,
                y: currentY - rowHeight,
                width: columnWidths[index],
                height: rowHeight,
                color: rgb(0, 0, 1), // Azul
            });

            // Desenhar o texto branco no fundo azul
            page.drawText(header, {
                x: cellX + 5,
                y: currentY - 18,
                size: 12,
                color: rgb(1, 1, 1), // Branco
            });

            // Desenhar a borda da célula do cabeçalho
            page.drawRectangle({
                x: cellX,
                y: currentY - rowHeight,
                width: columnWidths[index],
                height: rowHeight,
                borderColor: rgb(0, 0, 0),
                borderWidth: 1,
            });
            });
        }

        // Função para desenhar uma linha da tabela
        function drawRow(page: any, row: Record<string, any>, currentY: number) {
            Object.values(row).forEach((cell, index) => {
            const cellX = margin + columnWidths.slice(0, index).reduce((a, b) => a + b, 0);
            page.drawText(String(cell), {
                x: cellX + 5,
                y: currentY - 18,
                size: 10,
                color: rgb(0, 0, 0), // Cor do texto
            });
            page.drawRectangle({
                x: cellX,
                y: currentY - rowHeight,
                width: columnWidths[index],
                height: rowHeight,
                borderColor: rgb(0, 0, 0),
                borderWidth: 1,
            });
            });
        }

        // Gerar uma tabela para cada categoria
        for (const [category, items] of Object.entries(groupedByCategory)) {
            const typedItems = items as { name: string, status: string, createdAt: string, categorie: string }[];
            // Criar uma nova página para cada categoria
            let currentPage = pdfDoc.addPage(pageSize);
            currentY = pageSize[1] - margin;

            // Desenhar título da categoria
            currentPage.drawText(`Categoria: ${category}`, {
            x: margin,
            y: currentY - 10,
            size: 14,
            color: rgb(0, 0, 0),
            });
            currentY -= 30; // Espaço para o título

            // Desenhar cabeçalhos na nova página
            drawHeaders(currentPage, currentY);
            currentY -= rowHeight;

        
            typedItems.forEach((row) => {
            if (currentY - rowHeight < margin) {
                // Adicionar nova página quando o limite for atingido
                currentPage = pdfDoc.addPage(pageSize);
                currentY = pageSize[1] - margin;
                drawHeaders(currentPage, currentY);
                currentY -= rowHeight;
            }
            drawRow(currentPage, row, currentY);
            currentY -= rowHeight;
            });
        }

            const pdfBytes = await pdfDoc.save();

            // Configura os cabeçalhos da resposta
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename="listadefaltabh.pdf"');
        
            // Enviar o PDF como Buffer direto para a resposta
            res.end(pdfBytes);
    }
            
}

export default ProductController;