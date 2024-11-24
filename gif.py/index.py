import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import imageio

# Função para gerar a esfera de Bloch
def plot_bloch_sphere(ax, theta, phi):
    ax.cla()  # Limpa o gráfico anterior
    ax.set_box_aspect([1, 1, 1])  # Garante que a esfera seja esférica

    # Definir o ponto na esfera de Bloch
    x = np.sin(theta) * np.cos(phi)
    y = np.sin(theta) * np.sin(phi)
    z = np.cos(theta)

    # Plotando a esfera
    u = np.linspace(0, 2 * np.pi, 100)
    v = np.linspace(0, np.pi, 100)
    X = np.outer(np.cos(u), np.sin(v))
    Y = np.outer(np.sin(u), np.sin(v))
    Z = np.outer(np.ones(np.size(u)), np.cos(v))
    ax.plot_surface(X, Y, Z, color='c', alpha=0.1, rstride=5, cstride=5)

    # Plotando o vetor de estado
    ax.quiver(0, 0, 0, x, y, z, color='r', linewidth=2, label="Vetor de Estado")

    # Eixos X, Y, Z
    ax.quiver(0, 0, 0, 1, 0, 0, color='blue', linewidth=1, label="Eixo X")
    ax.quiver(0, 0, 0, 0, 1, 0, color='green', linewidth=1, label="Eixo Y")
    ax.quiver(0, 0, 0, 0, 0, 1, color='purple', linewidth=1, label="Eixo Z")

    # Definindo os limites do gráfico
    ax.set_xlim([-1, 1])
    ax.set_ylim([-1, 1])
    ax.set_zlim([-1, 1])

    # Títulos e rótulos
    ax.set_title("Esfera de Bloch")
    ax.set_xlabel("X")
    ax.set_ylabel("Y")
    ax.set_zlabel("Z")

    # Exibindo a legenda
    ax.legend()

# Função para gerar o GIF
def generate_bloch_gif(filename="bloch_sphere.gif", frames=100, fps=15):
    writer = imageio.get_writer(filename, mode='I', duration=1/fps)

    # Criando o gráfico para a esfera de Bloch
    fig = plt.figure(figsize=(6, 6))
    ax = fig.add_subplot(111, projection='3d')

    # Gerando o movimento da esfera de Bloch
    for i in range(frames):
        # Modificando os ângulos para o movimento
        theta = np.pi * (i / frames)  # Ângulo theta (0 a pi)
        phi = 2 * np.pi * (i / frames)  # Ângulo phi (0 a 2pi)
        
        plot_bloch_sphere(ax, theta, phi)
        
        # Salvando o quadro como uma imagem e adicionando ao GIF
        plt.draw()
        plt.tight_layout()
        plt.subplots_adjust(left=0, right=1, top=1, bottom=0)
        plt.savefig("/tmp/bloch_frame.png", format="png", transparent=True)  # Fundo transparente
        
        # Lendo a imagem e adicionando ao GIF
        frame = imageio.imread("/tmp/bloch_frame.png")
        writer.append_data(frame)
    
    writer.close()

# Gerar o GIF da esfera de Bloch
generate_bloch_gif("bloch_sphere.gif")
